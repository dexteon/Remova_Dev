// Mock Optery API integration
// In a real implementation, this would integrate with the actual Optery API

export interface Member {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Phone {
  number: string;
  type: 'mobile' | 'home' | 'work';
}

export interface Email {
  address: string;
  type: 'personal' | 'work';
}

export interface Relative {
  firstName: string;
  lastName: string;
  relationship: string;
}

export interface Company {
  name: string;
  role: string;
}

export interface OptOutStatistics {
  totalRemovals: number;
  inProgress: number;
  totalBrokers: number;
  completedThisMonth: number;
}

export interface OptOutEvent {
  id: string;
  broker: string;
  type: 'scan_started' | 'data_found' | 'removal_requested' | 'removal_completed' | 'evidence_captured';
  timestamp: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface OptOutRecord {
  id: string;
  broker: string;
  category: string;
  status: 'found' | 'in_progress' | 'removed' | 'failed';
  riskLevel: 'low' | 'medium' | 'high';
  recordsFound: number;
  exposedData: string[];
  screenshots?: {
    before?: string;
    after?: string;
  };
  lastUpdated: string;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
}

export interface Subscription {
  id: string;
  memberUuid: string;
  planId: string;
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelledAt?: string;
}

class OpteryAPIService {
  private baseURL = 'https://api.optery.com/v1';
  private authToken: string | null = null;

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.authToken ? { 'Authorization': `Bearer ${this.authToken}` } : {}),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Member Management
  async createMember(memberData: {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: string;
  }): Promise<Member> {
    // Mock implementation - would call real API
    const mockMember: Member = {
      uuid: `member-${Date.now()}`,
      email: memberData.email,
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      createdAt: new Date().toISOString(),
    };
    
    return new Promise(resolve => setTimeout(() => resolve(mockMember), 1000));
  }

  async getMember(uuid: string): Promise<Member> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      uuid,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString(),
    }), 500));
  }

  async updateMember(uuid: string, updates: Partial<Member>): Promise<Member> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      uuid,
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString(),
      ...updates,
    }), 1000));
  }

  async deleteMember(uuid: string): Promise<void> {
    // Mock implementation
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Address Management
  async addMemberAddress(memberUuid: string, address: Address): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Email Management
  async addMemberEmail(memberUuid: string, email: Email): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Phone Management
  async addMemberPhone(memberUuid: string, phone: Phone): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Relative Management
  async addMemberRelative(memberUuid: string, relative: Relative): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Company Management
  async addMemberCompany(memberUuid: string, company: Company): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Opt-Out Management
  async getOptOutStatistics(memberUuid: string): Promise<OptOutStatistics> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      totalRemovals: 87,
      inProgress: 23,
      totalBrokers: 156,
      completedThisMonth: 12,
    }), 500));
  }

  async getOptOutEvents(memberUuid: string): Promise<OptOutEvent[]> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve([
      {
        id: '1',
        broker: 'WhitePages.com',
        type: 'removal_completed',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'completed',
      },
      {
        id: '2',
        broker: 'PeopleSearch.net',
        type: 'data_found',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: 'in_progress',
      },
    ]), 500));
  }

  async getOptOutRecords(memberUuid: string): Promise<OptOutRecord[]> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve([
      {
        id: '1',
        broker: 'WhitePages.com',
        category: 'People Search',
        status: 'removed',
        riskLevel: 'high',
        recordsFound: 3,
        exposedData: ['Full Name', 'Address', 'Phone Number', 'Age'],
        screenshots: {
          before: '/api/placeholder/400/300',
          after: '/api/placeholder/400/300',
        },
        lastUpdated: '2024-01-15',
        createdAt: '2024-01-10',
      },
    ]), 500));
  }

  async pauseScan(memberUuid: string): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async resumeScan(memberUuid: string): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Subscription Management
  async getPlans(): Promise<Plan[]> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve([
      {
        id: 'essential',
        name: 'Essential Protection',
        price: 999,
        currency: 'USD',
        interval: 'month',
        features: ['Scan 50 data brokers', 'Basic removal service', 'Monthly reports'],
      },
      {
        id: 'complete',
        name: 'Complete Shield',
        price: 1999,
        currency: 'USD',
        interval: 'month',
        features: ['Scan 200+ data brokers', 'Priority removal', 'Real-time monitoring'],
      },
    ]), 500));
  }

  async getSubscription(memberUuid: string): Promise<Subscription | null> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      id: 'sub-123',
      memberUuid,
      planId: 'complete',
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }), 500));
  }

  async createSubscription(memberUuid: string, planId: string): Promise<Subscription> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      id: `sub-${Date.now()}`,
      memberUuid,
      planId,
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }), 1000));
  }

  async updateSubscription(memberUuid: string, planId: string): Promise<Subscription> {
    // Mock implementation
    return new Promise(resolve => setTimeout(() => resolve({
      id: 'sub-123',
      memberUuid,
      planId,
      status: 'active',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }), 1000));
  }

  async cancelSubscription(memberUuid: string): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

export const opteryAPI = new OpteryAPIService();