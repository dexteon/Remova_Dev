// RSS API integration for Remova
export interface RssItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  publishedAt: string;
  source: string;
  sourceHandle?: string;
}

export interface RssApiResponse {
  items: RssItem[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
  timestamp: string;
}

export interface TwitterSource {
  source_handle: string;
  description: string;
  alerts: string;
}

class RssAPIService {
  private baseURL = import.meta.env.VITE_SUPABASE_URL;
  
  async getRssItems(params: {
    limit?: number;
    offset?: number;
    source?: string;
  } = {}): Promise<RssApiResponse> {
    const { limit = 20, offset = 0, source } = params;
    
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    if (source) {
      searchParams.append('source', source);
    }

    const response = await fetch(
      `${this.baseURL}/functions/v1/get-rss-items?${searchParams}`,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`RSS API request failed: ${response.status}`);
    }

    return response.json();
  }

  async refreshFeeds(): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
      `${this.baseURL}/functions/v1/fetch-rss-feeds`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to refresh feeds: ${response.status}`);
    }

    return response.json();
  }

  // Get Twitter/X sources for display
  getTwitterSources(): TwitterSource[] {
    return [
      {
        source_handle: "@BleepinComputer",
        description: "Major infosec and breach news—including real-time data breach alerts and ransomware coverage.",
        alerts: "https://twitter.com/BleepinComputer"
      },
      {
        source_handle: "@haveibeenpwned",
        description: "Troy Hunt's official feed for HaveIBeenPwned, announcing new breach discoveries and database additions.",
        alerts: "https://twitter.com/haveibeenpwned"
      },
      {
        source_handle: "@TheHackersNews",
        description: "Breaks major cybersecurity, hacking, and breach headlines fast.",
        alerts: "https://twitter.com/TheHackersNews"
      },
      {
        source_handle: "@vxunderground",
        description: "Covers ransomware and breach gang developments before they hit mainstream media.",
        alerts: "https://twitter.com/vxunderground"
      },
      {
        source_handle: "@CyberSecurityN8",
        description: "Aggregates data breach, malware, and zero-day alerts from multiple global sources.",
        alerts: "https://twitter.com/CyberSecurityN8"
      },
      {
        source_handle: "@securityaffairs",
        description: "Pierluigi Paganini's alerts on global infosec and breach incidents.",
        alerts: "https://twitter.com/securityaffairs"
      },
      {
        source_handle: "@DataBreachesNet",
        description: "Official feed of DataBreaches.net—focus on investigative reporting and breach incident summaries.",
        alerts: "https://twitter.com/DataBreachesNet"
      }
    ];
  }
}

export const rssAPI = new RssAPIService();