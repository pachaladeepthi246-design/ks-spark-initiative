import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Upload, Save } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  twitter_url: z.string().url().optional().or(z.literal('')),
  portfolio_url: z.string().url().optional().or(z.literal('')),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
      linkedin_url: profile?.linkedin_url || '',
      github_url: profile?.github_url || '',
      twitter_url: profile?.twitter_url || '',
      portfolio_url: profile?.portfolio_url || '',
    },
  })

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)
      setAvatarUrl(publicUrl)
      await updateProfile({ avatar_url: publicUrl })
      toast.success('Avatar updated!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload avatar')
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (data: ProfileFormData) => {
    const { error } = await updateProfile({ ...data, avatar_url: avatarUrl })
    if (error) {
      toast.error('Failed to update profile')
    } else {
      toast.success('Profile updated successfully!')
    }
  }

  if (!user) {
    return <div className="p-8 text-center text-muted-foreground">Please log in to view your profile</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{profile?.full_name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="cursor-pointer">
                <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                  <span>{uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}Upload Avatar</span>
                </Button>
              </Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>

            <div className="grid gap-4">
              <div><Label htmlFor="full_name">Full Name</Label><Input {...register('full_name')} />{errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}</div>
              <div><Label htmlFor="phone">Phone</Label><Input {...register('phone')} /></div>
              <div><Label htmlFor="bio">Bio</Label><Textarea {...register('bio')} rows={3} /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>LinkedIn</Label><Input {...register('linkedin_url')} placeholder="https://linkedin.com/in/..." /></div>
                <div><Label>GitHub</Label><Input {...register('github_url')} placeholder="https://github.com/..." /></div>
                <div><Label>Twitter</Label><Input {...register('twitter_url')} placeholder="https://twitter.com/..." /></div>
                <div><Label>Portfolio</Label><Input {...register('portfolio_url')} placeholder="https://..." /></div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
