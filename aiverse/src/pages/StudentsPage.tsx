import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Github, Linkedin, Globe, Mail } from 'lucide-react';

interface Student {
  id: string;
  full_name: string;
  student_id: string;
  photo_url: string | null;
  bio: string | null;
  specialization: string | null;
  skills: string[];
  batch: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('public_students')
        .select('*')
        .order('joined_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    if (filter === 'all') return true;
    return student.specialization?.toLowerCase() === filter.toLowerCase();
  });

  const specializations = Array.from(new Set(students.map(s => s.specialization).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Community</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Meet Our Students</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented individuals from across India building the future of technology
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Students ({students.length})
          </button>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setFilter(spec || '')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === spec
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {student.photo_url ? (
                  <img
                    src={student.photo_url}
                    alt={student.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-24 h-24 text-primary/40" />
                )}
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{student.full_name}</h3>
                  <p className="text-sm text-muted-foreground">{student.student_id}</p>
                  {student.specialization && (
                    <p className="text-sm text-primary mt-1">{student.specialization}</p>
                  )}
                  {student.batch && (
                    <p className="text-xs text-muted-foreground mt-1">Batch: {student.batch}</p>
                  )}
                </div>

                {student.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-3">{student.bio}</p>
                )}

                {student.skills && student.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {student.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        +{student.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {student.portfolio_url && (
                    <a
                      href={student.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                      title="Portfolio"
                    >
                      <Globe className="w-4 h-4 text-secondary-foreground" />
                    </a>
                  )}
                  {student.github_url && (
                    <a
                      href={student.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4 text-secondary-foreground" />
                    </a>
                  )}
                  {student.linkedin_url && (
                    <a
                      href={student.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 text-secondary-foreground" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground">No students found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
