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
  private baseURL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
  
  async getRssItems(params: {
    limit?: number;
    offset?: number;
    source?: string;
  } = {}): Promise<RssApiResponse> {
    const { limit = 20, offset = 0, source } = params;
    
    // If no Supabase URL is configured, return mock data
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return this.getMockRssItems(limit, offset);
    }
    
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    if (source) {
      searchParams.append('source', source);
    }

    try {
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
    } catch (error) {
      console.error('RSS API Error:', error);
      // Fallback to mock data if API fails
      return this.getMockRssItems(limit, offset);
    }
  }

  async refreshFeeds(): Promise<{ success: boolean; message: string }> {
    if (!import.meta.env.VITE_SUPABASE_URL) {
      return { success: true, message: 'Mock data refresh simulated' };
    }
    
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

  // Fallback mock data for when Supabase isn't configured
  private getMockRssItems(limit: number, offset: number): RssApiResponse {
    const mockItems: RssItem[] = [
      {
        id: '1',
        title: 'Major Healthcare Provider Suffers Data Breach Affecting 2.3M Patients',
        link: 'https://databreaches.net/2024/01/15/major-healthcare-breach',
        summary: 'A leading healthcare provider has disclosed a significant data breach that exposed personal health information of over 2.3 million patients, including names, addresses, Social Security numbers, and medical records.',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        source: 'DataBreaches.net',
        sourceHandle: '@DataBreachesNet'
      },
      {
        id: '2', 
        title: 'Financial Services Firm Discloses Ransomware Attack',
        link: 'https://www.upguard.com/breaches/financial-ransomware-attack',
        summary: 'A major financial services company has confirmed it was targeted by ransomware actors who gained access to customer account information and transaction histories before encryption occurred.',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        source: 'UpGuard',
        sourceHandle: '@UpGuardHQ'
      },
      {
        id: '3',
        title: 'Government Agency Database Exposed Online',
        link: 'https://haveibeenpwned.com/Breach/GovAgency2024',
        summary: 'A misconfigured database belonging to a government agency was discovered exposed online for several months, containing sensitive citizen information and internal communications.',
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        source: 'HaveIBeenPwned',
        sourceHandle: '@haveibeenpwned'
      },
      {
        id: '4',
        title: 'Retail Chain Suffers Point-of-Sale System Breach',
        link: 'https://www.itpro.com/security/retail-pos-breach-2024',
        summary: 'A popular retail chain has disclosed that attackers compromised their point-of-sale systems across multiple locations, potentially exposing customer payment card information.',
        publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
        source: 'IT Pro',
        sourceHandle: '@ITProUK'
      },
      {
        id: '5',
        title: 'Cloud Storage Provider Confirms Data Exposure',
        link: 'https://www.databreachtoday.com/cloud-storage-breach',
        summary: 'A cloud storage provider has confirmed that a configuration error led to unauthorized access to customer files and metadata, affecting enterprise and individual users.',
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        source: 'DataBreachToday',
        sourceHandle: '@DataBreachTdy'
      },
      {
        id: '6',
        title: 'University System Targeted in Sophisticated Phishing Campaign',
        link: 'https://dis-blog.thalesgroup.com/university-phishing-attack',
        summary: 'A major university system fell victim to a sophisticated phishing campaign that compromised faculty and student credentials, leading to unauthorized access to research data.',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        source: 'Thales Security',
        sourceHandle: '@ThalesCloud'
      }
    ];
    const paginatedItems = mockItems.slice(offset, offset + limit);
    
    return {
      items: paginatedItems,
      pagination: {
        limit,
        offset,
        total: mockItems.length,
        hasMore: (offset + limit) < mockItems.length,
      },
      timestamp: new Date().toISOString(),
    };
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