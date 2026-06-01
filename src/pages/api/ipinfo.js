export const prerender = false;

export async function GET({ request, clientAddress }) {
  try {
    // Get client IP address from various sources
    let ip = request.headers.get('x-forwarded-for');
    if (ip) {
      ip = ip.split(',')[0].trim();
    } else {
      ip = request.headers.get('x-real-ip') || 
          request.headers.get('cf-connecting-ip') ||
          clientAddress;
    }

    console.log('Client IP:', ip);

    // Function to check if IP is private/local
    const isPrivateIP = (ipAddr) => {
      return /^(127\.|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|::1|fc|fd)/.test(ipAddr);
    };

    // If running on local network or empty, try to get public IP
    let publicIP = null;
    if (!ip || isPrivateIP(ip)) {
      try {
        const publicIPResponse = await fetch('https://api.ipify.org?format=json', {
          headers: { 'User-Agent': 'IPG-App/1.0' }
        });
        if (publicIPResponse.ok) {
          const publicIPData = await publicIPResponse.json();
          publicIP = publicIPData.ip;
          console.log('Public IP detected:', publicIP);
        }
      } catch (err) {
        console.log('Could not fetch public IP:', err.message);
      }
    } else {
      publicIP = ip;
    }

    const lookupIP = publicIP || ip;

    // Get LocationIQ API key (optional — graceful fallback)
    const locationiqKey = process.env.LOCATIONIQ_KEY || import.meta.env.LOCATIONIQ_KEY;

    // Parse query parameters for coordinates
    const url = new URL(request.url);
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');

    let locationData = {};

    const reverseGeocode = async (latitude, longitude, key) => {
      if (!key) throw new Error('No LocationIQ key');
      const locationiqUrl = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${latitude}&lon=${longitude}&format=json`;
      const locationiqResponse = await fetch(locationiqUrl, {
        headers: { 'User-Agent': 'IPG-App/1.0' }
      });
      if (!locationiqResponse.ok) throw new Error(`LocationIQ error! status: ${locationiqResponse.status}`);
      const locationiqData = await locationiqResponse.json();
      const addr = locationiqData.address || {};
      return {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        address: addr.road || '',
        house_number: addr.house_number || '',
        neighbourhood: addr.neighbourhood || '',
        city: addr.city || addr.town || '',
        county: addr.county || '',
        region: addr.state || addr.province || '',
        country: addr.country || '',
        postal: addr.postcode || '',
        display_name: locationiqData.display_name || '',
        importance: locationiqData.importance || 0
      };
    };

    // 1) If GPS coords provided, use them directly
    if (lat && lon) {
      try {
        locationData = await reverseGeocode(lat, lon, locationiqKey);
      } catch (err) {
        console.error('LocationIQ reverse geocoding failed:', err.message);
      }
    }

    // 2) Otherwise, try IP-based geolocation → LocationIQ
    if (!lat || !lon || Object.keys(locationData).length === 0) {
      try {
        const ipLookupUrl = `https://ipapi.co/${lookupIP}/json/`;
        const ipResponse = await fetch(ipLookupUrl, {
          headers: { 'User-Agent': 'IPG-App/1.0' }
        });
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          if (ipData.latitude && ipData.longitude) {
            try {
              locationData = await reverseGeocode(ipData.latitude, ipData.longitude, locationiqKey);
            } catch (err) {
              console.error('LocationIQ reverse geocoding failed (IP-based):', err.message);
              locationData = {
                latitude: ipData.latitude.toString(),
                longitude: ipData.longitude.toString(),
                city: ipData.city || '',
                region: ipData.region || '',
                country: ipData.country_name || '',
                postal: ipData.postal || ''
              };
            }
          } else {
            locationData = { ...ipData };
          }
        }
      } catch (err) {
        console.error('IP geolocation lookup failed:', err.message);
      }
    }

    return new Response(JSON.stringify({
      localIP: ip,
      publicIP: publicIP || lookupIP,
      ip: lookupIP,
      ...locationData
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error in IP info endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch location info', 
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}