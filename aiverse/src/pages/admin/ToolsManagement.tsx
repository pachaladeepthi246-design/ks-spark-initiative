import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Tool {
  id: number;
  name: string;
  description: string;
  link: string;
  category: string;
  logo_url?: string;
  screenshot_url?: string;
  featured: boolean;
  popularity_score: number;
  source?: string;
  tags?: string[];
}

export default function ToolsManagement() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<Tool>>({
    name: '',
    description: '',
    link: '',
    category: '',
    logo_url: '',
    screenshot_url: '',
    featured: false,
    popularity_score: 0,
    source: '',
    tags: []
  });

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = tools;
    
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tool => tool.category === categoryFilter);
    }

    setFilteredTools(filtered);
  }, [searchQuery, categoryFilter, tools]);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
      setFilteredTools(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name');

      if (error) throw error;
      setCategories(data?.map(c => c.name) || []);
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingTool) {
        const { error } = await supabase
          .from('tools')
          .update(formData)
          .eq('id', editingTool.id);

        if (error) throw error;
        toast.success('Tool updated successfully');
      } else {
        const { error } = await supabase
          .from('tools')
          .insert([formData]);

        if (error) throw error;
        toast.success('Tool added successfully');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save tool');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (tool: Tool) => {
    setEditingTool(tool);
    setFormData(tool);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Tool deleted successfully');
      fetchTools();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete tool');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      link: '',
      category: '',
      logo_url: '',
      screenshot_url: '',
      featured: false,
      popularity_score: 0,
      source: '',
      tags: []
    });
    setEditingTool(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>AI Tools Management</CardTitle>
              <CardDescription>Add, edit, and manage AI tools in the directory</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => resetForm()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingTool ? 'Edit Tool' : 'Add New Tool'}</DialogTitle>
                  <DialogDescription>
                    {editingTool ? 'Update tool information' : 'Add a new AI tool to the directory'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tool Name*</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description*</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Website URL*</Label>
                    <Input
                      id="link"
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category*</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="popularity_score">Popularity Score</Label>
                      <Input
                        id="popularity_score"
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.popularity_score}
                        onChange={(e) => setFormData(prev => ({ ...prev, popularity_score: parseFloat(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo_url">Logo URL</Label>
                    <Input
                      id="logo_url"
                      type="url"
                      value={formData.logo_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshot_url">Screenshot URL</Label>
                    <Input
                      id="screenshot_url"
                      type="url"
                      value={formData.screenshot_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, screenshot_url: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
                    />
                    <Label htmlFor="featured" className="cursor-pointer">Featured Tool</Label>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      {editingTool ? 'Update Tool' : 'Add Tool'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleDialogClose}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tools Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No tools found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell className="font-medium">{tool.name}</TableCell>
                      <TableCell>{tool.category}</TableCell>
                      <TableCell>{tool.popularity_score.toFixed(1)}</TableCell>
                      <TableCell>{tool.featured ? '⭐' : '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(tool)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(tool.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredTools.length} of {tools.length} tools
          </div>
        </CardContent>
      </Card>
    </div>
  );
}