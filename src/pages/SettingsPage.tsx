import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const { user, profile } = useAuth()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div><Label>Email</Label><p className="text-muted-foreground">{user?.email}</p></div>
          <div className="flex items-center justify-between">
            <div><Label>Email Notifications</Label><p className="text-sm text-muted-foreground">Receive updates about new tools</p></div>
            <Switch />
          </div>
        </CardContent>
      </Card>
      <Card className="border-destructive">
        <CardHeader><CardTitle className="text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent><Button variant="destructive">Delete Account</Button></CardContent>
      </Card>
    </div>
  )
}
