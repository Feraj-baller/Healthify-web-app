"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, Eye, EyeOff, Edit2, Save, X } from "lucide-react"

interface UserProfile {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    gender: string
    location: string
    joinDate: string
  }
  healthInfo: {
    height: string
    weight: string
    activityLevel: string
    dietaryPreferences: string[]
    healthGoals: string[]
    allergies: string[]
  }
  accountSettings: {
    username: string
    password: string
    twoFactorEnabled: boolean
    emailNotifications: boolean
    pushNotifications: boolean
    dataSharing: boolean
  }
  subscription: {
    plan: string
    status: string
    nextBilling: string
    features: string[]
  }
}

const demoUserData: UserProfile = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@healthify.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    location: "San Francisco, CA",
    joinDate: "2023-01-15",
  },
  healthInfo: {
    height: "5'10\" (178 cm)",
    weight: "175 lbs (79 kg)",
    activityLevel: "Moderately Active",
    dietaryPreferences: ["Vegetarian", "Low Sugar"],
    healthGoals: ["Weight Loss", "Muscle Gain", "Better Sleep"],
    allergies: ["Nuts", "Shellfish"],
  },
  accountSettings: {
    username: "johndoe_health",
    password: "••••••••••••",
    twoFactorEnabled: true,
    emailNotifications: true,
    pushNotifications: false,
    dataSharing: true,
  },
  subscription: {
    plan: "AI Pro",
    status: "Active",
    nextBilling: "2024-02-15",
    features: ["Unlimited Scans", "Advanced AI Insights", "Family Tracking", "Priority Support"],
  },
}

export default function ProfileSection() {
  const [userProfile, setUserProfile] = useState<UserProfile>(demoUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(demoUserData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile({ ...userProfile })
  }

  const handleSave = () => {
    setUserProfile(editedProfile)
    setIsEditing(false)
    // Show success message
    alert("Profile updated successfully!")
  }

  const handleCancel = () => {
    setEditedProfile({ ...userProfile })
    setIsEditing(false)
  }

  const handleInputChange = (section: keyof UserProfile, field: string, value: any) => {
    setEditedProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const currentProfile = isEditing ? editedProfile : userProfile

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Profile Settings
          </h1>
          <p className="text-xl text-gray-600">Manage your account and health information</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <button onClick={handleEdit} className="btn-primary flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <button onClick={handleCancel} className="btn-secondary flex items-center gap-2">
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Profile Overview Card */}
        <div className="xl:col-span-1">
          <div className="glass-card">
            <div className="p-6 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                {currentProfile.personalInfo.firstName[0]}
                {currentProfile.personalInfo.lastName[0]}
              </div>

              {/* Basic Info */}
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {currentProfile.personalInfo.firstName} {currentProfile.personalInfo.lastName}
              </h2>
              <p className="text-gray-600 mb-2">@{currentProfile.accountSettings.username}</p>
              <p className="text-sm text-gray-500 mb-4">
                Member since {new Date(currentProfile.personalInfo.joinDate).toLocaleDateString()}
              </p>

              {/* Subscription Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                {currentProfile.subscription.plan} Plan
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">94</div>
                  <div className="text-xs text-gray-600">Health Score</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-xs text-gray-600">Scans Done</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="xl:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.personalInfo.firstName}
                      onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentProfile.personalInfo.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentProfile.personalInfo.lastName}
                      onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">{currentProfile.personalInfo.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={currentProfile.personalInfo.email}
                        onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{currentProfile.personalInfo.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={currentProfile.personalInfo.phone}
                        onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{currentProfile.personalInfo.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="date"
                        value={currentProfile.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange("personalInfo", "dateOfBirth", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {new Date(currentProfile.personalInfo.dateOfBirth).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentProfile.personalInfo.location}
                        onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{currentProfile.personalInfo.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account & Security
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* Login Credentials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={currentProfile.accountSettings.username}
                        onChange={(e) => handleInputChange("accountSettings", "username", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">@{currentProfile.accountSettings.username}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 font-medium flex-1">
                        {showPassword ? "healthify2024!" : currentProfile.accountSettings.password}
                      </p>
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {isEditing && <button className="btn-secondary text-sm py-1 px-3">Change Password</button>}
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            currentProfile.accountSettings.twoFactorEnabled
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {currentProfile.accountSettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                        </span>
                        {isEditing && (
                          <button
                            onClick={() =>
                              handleInputChange(
                                "accountSettings",
                                "twoFactorEnabled",
                                !currentProfile.accountSettings.twoFactorEnabled,
                              )
                            }
                            className="btn-secondary text-sm py-1 px-3"
                          >
                            Toggle
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notification Preferences
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentProfile.accountSettings.emailNotifications}
                          onChange={(e) => handleInputChange("accountSettings", "emailNotifications", e.target.checked)}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentProfile.accountSettings.pushNotifications}
                          onChange={(e) => handleInputChange("accountSettings", "pushNotifications", e.target.checked)}
                          disabled={!isEditing}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h3 className="text-xl font-semibold text-gray-900">Health Profile</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                  <p className="text-gray-900 font-medium">{currentProfile.healthInfo.height}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                  <p className="text-gray-900 font-medium">{currentProfile.healthInfo.weight}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  <p className="text-gray-900 font-medium">{currentProfile.healthInfo.activityLevel}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.healthInfo.dietaryPreferences.map((pref, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Goals</label>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.healthInfo.healthGoals.map((goal, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Information */}
          <div className="glass-card">
            <div className="p-6 border-b border-gray-200 bg-white/50">
              <h3 className="text-xl font-semibold text-gray-900">Subscription Details</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{currentProfile.subscription.plan}</h4>
                  <p className="text-gray-600">
                    Status: <span className="text-emerald-600 font-medium">{currentProfile.subscription.status}</span>
                  </p>
                  <p className="text-gray-600">
                    Next billing: {new Date(currentProfile.subscription.nextBilling).toLocaleDateString()}
                  </p>
                </div>
                <button className="btn-secondary">Manage Subscription</button>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Plan Features:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentProfile.subscription.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
