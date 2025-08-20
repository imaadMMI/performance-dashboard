const API_BASE_URL = 'http://192.168.1.15:5000/api';

export interface ArchetypeCard {
  archetype_students: number;
  category: string | null;
  example_quotes: string[];
  name: string;
  percentage_of_all: number;
  percentage_of_category: number;
  retention_rate: number;
  total_students: number;
}

export interface Service {
  retention_rate: number;
  service_name: string;
}

export interface ArchetypeFeature {
  importance: number;
  name: string;
}

export interface ArchetypeQuote {
  content: string;
  justification: string;
}

export interface ArchetypeRecommendation {
  content: string;
  headline: string;
  impact_score: number;
}

export interface ArchetypeProfile {
  description: string;
  features: ArchetypeFeature[];
  name: string;
  percentage_of_all_students: number;
  quotes: ArchetypeQuote[];
  recommendations?: ArchetypeRecommendation[];
  retention_rate?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface ServicesResponse {
  success: boolean;
  data: Service[];
  count: number;
  filters: {
    teaching_period: string | null;
    university: string | null;
    year: string | null;
  };
}

export const apiService = {
  async getHealth(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  async getArchetypeCards(params?: {
    university?: string;
    teaching_period?: string;
  }): Promise<ApiResponse<ArchetypeCard[]>> {
    const searchParams = new URLSearchParams();
    if (params?.university) searchParams.append('university', params.university);
    if (params?.teaching_period) searchParams.append('teaching_period', params.teaching_period);
    
    const response = await fetch(`${API_BASE_URL}/archetype-cards${searchParams.toString() ? '?' + searchParams.toString() : ''}`);
    return response.json();
  },

  async getServices(params?: {
    university?: string;
    teaching_period?: string;
    year?: string;
  }): Promise<ServicesResponse> {
    const searchParams = new URLSearchParams();
    if (params?.university) searchParams.append('university', params.university);
    if (params?.teaching_period) searchParams.append('teaching_period', params.teaching_period);
    if (params?.year) searchParams.append('year', params.year);
    
    const response = await fetch(`${API_BASE_URL}/services${searchParams.toString() ? '?' + searchParams.toString() : ''}`);
    return response.json();
  },

  async getArchetypeProfile(
    archetypeName: string,
    params?: {
      quote_number?: number;
      university?: string;
      teaching_period?: string;
    }
  ): Promise<ApiResponse<ArchetypeProfile>> {
    const searchParams = new URLSearchParams();
    if (params?.quote_number) searchParams.append('quote_number', params.quote_number.toString());
    if (params?.university) searchParams.append('university', params.university);
    if (params?.teaching_period) searchParams.append('teaching_period', params.teaching_period);
    
    const response = await fetch(`${API_BASE_URL}/archetype-profile/${encodeURIComponent(archetypeName)}${searchParams.toString() ? '?' + searchParams.toString() : ''}`);
    return response.json();
  },
};