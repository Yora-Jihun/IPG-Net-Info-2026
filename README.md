# Location Intelligence Detector

A modern, serverless real-time geolocation and network information tracker built with [Astro](https://astro.build).

Detects visitor location using GPS and IP-based geolocation, displays comprehensive network data including public/private IP addresses, ISP information, timezone, and geographic coordinates.

---

## Features

- **GPS Detection** - Browser geolocation with fallback to IP-based detection
- **IP Intelligence** - Public and local IP identification with geolocation data
- **Network Information** - ISP, timezone, coordinates, and location details
- **Modern UI** - Professional dark theme with color-coded data categories
- **Serverless Ready** - Deploy instantly on Vercel with no database required
- **Real-time Data** - Instant location detection on page load

---

## How It Works

1. **Frontend** - Requests GPS permission and collects browser user agent data
2. **API Endpoint** - Fetches public IP info from ipinfo.io API
3. **Network Detection** - Distinguishes between local (192.168.x.x) and public IPs
4. **Display** - Shows all collected data in organized, color-coded cards

---

## Author

Created by **Yora Ji-hun**

---

## License

MIT
