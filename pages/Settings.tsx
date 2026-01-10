import React from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
export function Settings() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Profile Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" defaultValue="Alex" />
            <Input label="Last Name" defaultValue="Chen" />
          </div>
          <Input label="Email Address" defaultValue="alex.chen@example.com" />
          <div className="pt-2">
            <Button>Save Changes</Button>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-500">
                Receive updates about your generations
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                defaultChecked
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-6 checked:border-blue-500"
              />
              <label
                htmlFor="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"
              ></label>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <div>
              <p className="font-medium text-slate-900">Dark Mode</p>
              <p className="text-sm text-slate-500">
                Switch between light and dark themes
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle2"
                id="toggle2"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-6 checked:border-slate-300"
              />
              <label
                htmlFor="toggle2"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
