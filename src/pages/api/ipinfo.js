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

    // Use public IP for ipinfo lookup
    const lookupIP = publicIP || ip;

    // Get token from environment variables
    const token = process.env.INFO_TOKEN || import.meta.env.INFO_TOKEN;
    const url = token 
      ? `https://ipinfo.io/${lookupIP}/json?token=${token}` 
      : `https://ipinfo.io/${lookupIP}/json`;

    console.log('Fetching IP info for:', lookupIP);

    const response = await fetch(url, {
      headers: { 'User-Agent': 'IPG-App/1.0' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("IPInfo API Response:", data);

    return new Response(JSON.stringify({
      localIP: ip,
      publicIP: publicIP || lookupIP,
      ip: data.ip || lookupIP,
      city: data.city || '',
      region: data.region || '',
      country: data.country || '',
      postal: data.postal || '',
      timezone: data.timezone || '',
      latitude: data.loc ? data.loc.split(',')[0] : '',
      longitude: data.loc ? data.loc.split(',')[1] : '',
      org: data.org || '',
      isp: data.org || '',
      hostname: data.hostname || '',
      loc: data.loc || ''
    }), {
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error fetching IP info:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch IP info', 
      details: error.message,
      message: 'Please check Vercel logs'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}