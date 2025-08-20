import { useState, useEffect } from 'react';
import { apiService, ArchetypeCard, ArchetypeProfile } from '@/services/api';

export const useArchetypes = () => {
  const [archetypeCards, setArchetypeCards] = useState<ArchetypeCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchetypes = async () => {
      try {
        const response = await apiService.getArchetypeCards({
          university: 'MONASH',
          teaching_period: 'TP1'
        });
        if (response.success && response.data) {
          setArchetypeCards(response.data);
        } else {
          setError('Failed to fetch archetype data');
        }
      } catch (err) {
        setError('Error fetching archetype data');
        console.error('Error fetching archetypes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArchetypes();
  }, []);

  return { archetypeCards, loading, error };
};

export const useArchetypeProfile = (archetypeName: string) => {
  const [profile, setProfile] = useState<ArchetypeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!archetypeName) return;
      
      try {
        setLoading(true);
        const response = await apiService.getArchetypeProfile(archetypeName, {
          university: 'MONASH',
          teaching_period: 'TP1'
        });
        
        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          setError('Failed to fetch archetype profile');
        }
      } catch (err) {
        setError('Error fetching archetype profile');
        console.error('Error fetching archetype profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [archetypeName]);

  return { profile, loading, error };
};