import { NextRequest, NextResponse } from "next/server";
import { events } from "@/lib/data/mockData";

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real app, you would save to a database here
    const newEvent = {
      id: Date.now().toString(),
      ...body,
      registered: 0,
    };

    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// Helper function to extract meta tags
function extractMeta(html: string, name: string): string {
  let match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'));
  if (match) return match[1];
  match = html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${name}["']`, 'i'));
  return match ? match[1] : "";
}

function extractTitle(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    const eventSlugIndex = pathParts.indexOf("events") + 2;
    if (eventSlugIndex < pathParts.length) {
      const slug = pathParts[eventSlugIndex];
      return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/Et\d+$/i, "");
    }
    return "BookMyShow Event";
  } catch {
    return "BookMyShow Event";
  }
}

function formatCity(citySlug: string): string {
  return citySlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// BookMyShow URL import handler
export async function PUT(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const bmsPattern = /^https?:\/\/(www\.)?(in\.)?bookmyshow\.com\/.+/i;
    if (!bmsPattern.test(url)) {
      return NextResponse.json({ error: "Invalid BookMyShow URL" }, { status: 400 });
    }

    console.log('[BookMyShow Import] Fetching URL:', url);

    // Fetch the page content
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    console.log('[BookMyShow Import] Fetch response status:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    console.log('[BookMyShow Import] HTML fetched, length:', html.length);
    console.log('[BookMyShow Import] HTML preview:', html.substring(0, 500));

    // Extract JSON-LD structured data
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
    let eventData: Record<string, unknown> = {};

    if (jsonLdMatch) {
      for (const match of jsonLdMatch) {
        try {
          const jsonContent = match.replace(/<script type="application\/ld\+json">/i, "").replace(/<\/script>/i, "");
          const parsed = JSON.parse(jsonContent);
          if (parsed["@type"] === "Event" || (Array.isArray(parsed) && parsed.some((p: { "@type"?: string }) => p["@type"] === "Event"))) {
            eventData = Array.isArray(parsed) ? parsed.find((p: { "@type"?: string }) => p["@type"] === "Event") : parsed;
            console.log('[BookMyShow Import] Found Event JSON-LD:', JSON.stringify(eventData, null, 2));
            break;
          }
        } catch (e) {
          console.log('[BookMyShow Import] Failed to parse JSON-LD:', e);
        }
      }
    }

    const ogTitle = extractMeta(html, 'og:title');
    const ogDescription = extractMeta(html, 'og:description');
    const ogImage = extractMeta(html, 'og:image');
    const twitterImage = extractMeta(html, 'twitter:image');

    const urlParts = new URL(url);
    const pathParts = urlParts.pathname.split("/").filter(Boolean);
    let city = "Bangalore"; // Default to Bangalore
    
    // Try to extract city from various URL patterns
    // Pattern 1: /bangalore/events/...
    // Pattern 2: /events/bangalore/...
    if (pathParts.length >= 2) {
      if (pathParts[0].toLowerCase() !== "events" && pathParts[0].toLowerCase() !== "activities") {
        city = formatCity(pathParts[0]);
      } else if (pathParts[1].toLowerCase() !== "events" && pathParts.length >= 2) {
        city = formatCity(pathParts[1]);
      }
    }
    
    console.log('[BookMyShow Import] Extracted city:', city);

    let eventDate = "";
    let eventTime = "";
    let eventEndTime = "";
    
    if (eventData.startDate) {
      const startDate = new Date(eventData.startDate as string);
      eventDate = startDate.toISOString().split("T")[0];
      eventTime = startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
      
      console.log('[BookMyShow Import] Found startDate:', eventData.startDate, '-> Date:', eventDate, 'Time:', eventTime);
      
      // Extract end time if available
      if (eventData.endDate) {
        const endDate = new Date(eventData.endDate as string);
        eventEndTime = endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
        console.log('[BookMyShow Import] Found endDate:', eventData.endDate, '-> EndTime:', eventEndTime);
      }
    } else {
      console.log('[BookMyShow Import] No startDate in JSON-LD, trying HTML parsing...');
      
      // Try multiple date patterns
      const datePatterns = [
        /(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*,?\s*(\d{4})/i,
        /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*,?\s*(\d{4})?/i,
        /(\d{4})-(\d{2})-(\d{2})/,
        /(\d{2})\/(\d{2})\/(\d{4})/,
      ];
      
      for (const pattern of datePatterns) {
        const dateMatch = html.match(pattern);
        if (dateMatch) {
          console.log('[BookMyShow Import] Date pattern matched:', pattern, 'Result:', dateMatch);
          const months: Record<string, string> = { 
            jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", 
            jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" 
          };
          
          // Handle different date formats
          if (pattern.toString().includes('Jan|Feb')) {
            const day = dateMatch[1].padStart(2, "0");
            const month = months[dateMatch[2].toLowerCase().slice(0, 3)];
            const year = dateMatch[3] || new Date().getFullYear().toString();
            eventDate = `${year}-${month}-${day}`;
          } else if (pattern.toString().includes('\\d{4}-\\d{2}')) {
            // YYYY-MM-DD format
            eventDate = dateMatch[0];
          } else if (pattern.toString().includes('\\/')) {
            // DD/MM/YYYY or MM/DD/YYYY
            eventDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
          }
          
          if (eventDate) {
            console.log('[BookMyShow Import] Extracted date:', eventDate);
            break;
          }
        }
      }
      
      // Try multiple time patterns
      const timePatterns = [
        // Time range with AM/PM: "3:00 PM - 6:00 PM"
        /(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i,
        // Time range without AM/PM: "15:00 - 18:00"
        /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/,
        // Single time with AM/PM: "3:00 PM"
        /(\d{1,2}):(\d{2})\s*(AM|PM)/i,
        // Single time 24h: "15:00"
        /(\d{1,2}):(\d{2})/,
      ];
      
      for (const pattern of timePatterns) {
        const timeMatch = html.match(pattern);
        if (timeMatch) {
          console.log('[BookMyShow Import] Time pattern matched:', pattern, 'Result:', timeMatch);
          
          // Check if it's a range
          if (timeMatch.length >= 6 && timeMatch[4]) {
            // Range with AM/PM
            let startHour = parseInt(timeMatch[1]);
            let endHour = parseInt(timeMatch[4]);
            const startMin = timeMatch[2];
            const endMin = timeMatch[5];
            const startMeridiem = timeMatch[3]?.toUpperCase();
            const endMeridiem = timeMatch[6]?.toUpperCase();
            
            if (startMeridiem === "PM" && startHour !== 12) startHour += 12;
            if (startMeridiem === "AM" && startHour === 12) startHour = 0;
            if (endMeridiem === "PM" && endHour !== 12) endHour += 12;
            if (endMeridiem === "AM" && endHour === 12) endHour = 0;
            
            eventTime = `${startHour.toString().padStart(2, "0")}:${startMin}`;
            eventEndTime = `${endHour.toString().padStart(2, "0")}:${endMin}`;
          } else if (timeMatch.length >= 4 && timeMatch[3] && timeMatch[4]) {
            // Range without AM/PM
            eventTime = `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
            eventEndTime = `${timeMatch[3].padStart(2, "0")}:${timeMatch[4]}`;
          } else {
            // Single time
            let hour = parseInt(timeMatch[1]);
            const min = timeMatch[2];
            const meridiem = timeMatch[3]?.toUpperCase();
            
            if (meridiem === "PM" && hour !== 12) hour += 12;
            if (meridiem === "AM" && hour === 12) hour = 0;
            
            eventTime = `${hour.toString().padStart(2, "0")}:${min}`;
          }
          
          if (eventTime) {
            console.log('[BookMyShow Import] Extracted time:', eventTime, eventEndTime ? `- ${eventEndTime}` : '');
            break;
          }
        }
      }
    }
    
    console.log('[BookMyShow Import] Final date/time:', { eventDate, eventTime, eventEndTime });

    let location = "";
    let address = "";
    
    if (eventData.location) {
      if (typeof eventData.location === 'object' && eventData.location !== null) {
        const loc = eventData.location as { name?: string; address?: string | { streetAddress?: string; addressLocality?: string; addressRegion?: string; postalCode?: string } };
        location = loc.name || city;
        
        // Extract full address
        if (typeof loc.address === 'string') {
          address = loc.address;
        } else if (typeof loc.address === 'object' && loc.address !== null) {
          const addr = loc.address;
          const parts = [
            addr.streetAddress,
            addr.addressLocality,
            addr.addressRegion,
            addr.postalCode
          ].filter(Boolean);
          address = parts.join(", ");
        }
      } else {
        location = city;
      }
    } else {
      location = city;
    }

    // Try to extract venue address from page content
    if (!address) {
      const venueMatch = html.match(/<div[^>]*class="[^"]*venue[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      if (venueMatch) {
        const venueText = venueMatch[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        if (venueText.length > 5 && venueText.length < 200) {
          address = venueText;
        }
      }
    }

    let description = "";
    if (eventData.description) {
      description = eventData.description as string;
    } else if (ogDescription) {
      description = ogDescription;
    }
    description = description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim().slice(0, 500);

    const coverImage = ogImage || twitterImage || eventData.image as string || "";
    const title = eventData.name as string || ogTitle || extractTitle(url);

    const performers: string[] = [];
    if (eventData.performer) {
      const performerData = eventData.performer;
      if (Array.isArray(performerData)) {
        performerData.forEach((p: { name?: string }) => { if (p.name) performers.push(p.name); });
      } else if (typeof performerData === 'object' && performerData !== null && 'name' in performerData) {
        performers.push((performerData as { name: string }).name);
      }
    }

    const responseData = {
      title,
      date: eventDate,
      time: eventTime,
      endTime: eventEndTime,
      location,
      address,
      city,
      description,
      coverImage,
      bookingUrl: url,
      performers,
      source: "bookmyshow",
    };

    console.log('[BookMyShow Import] Returning data:', JSON.stringify(responseData, null, 2));

    return NextResponse.json({
      success: true,
      data: responseData,
      partial: !eventDate || !eventTime, // Mark as partial if date/time missing
    });

  } catch (error) {
    // Log the actual error
    console.error('[BookMyShow Import] Error occurred:', error);
    
    // Fallback: extract basic info from URL only
    try {
      const { url } = await request.json();
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/").filter(Boolean);
      let city = "Bangalore", title = "BookMyShow Event";
      
      // More flexible URL parsing
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i].toLowerCase() === "events" && i + 1 < pathParts.length) {
          // City might be before or after "events"
          if (i > 0 && pathParts[i-1].toLowerCase() !== "www") {
            city = formatCity(pathParts[i-1]);
          }
          // Event name is usually after "events" or after city
          if (i + 1 < pathParts.length) {
            const eventSlug = pathParts[i + 1];
            if (!eventSlug.match(/^ET\d+$/i)) { // Skip if it's just an event ID
              title = eventSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/Et\d+$/i, "");
            }
          }
          break;
        }
      }
      
      console.log('[BookMyShow Import] Fallback extraction:', { city, title });
      
      return NextResponse.json({
        success: true,
        data: { title, location: city, city, bookingUrl: url, description: "Event imported from BookMyShow. Visit the booking link for more details.", source: "bookmyshow" },
        partial: true,
        error: error instanceof Error ? error.message : "Failed to fetch full details"
      });
    } catch (fallbackError) {
      console.error('[BookMyShow Import] Fallback also failed:', fallbackError);
      return NextResponse.json({ 
        error: error instanceof Error ? error.message : "Failed to parse URL",
        details: fallbackError instanceof Error ? fallbackError.message : "Unknown error"
      }, { status: 500 });
    }
  }
}
