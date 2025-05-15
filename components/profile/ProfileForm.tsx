"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { GraduationCap, Calendar, Book } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { courses, branches } from "@/constants/data"
import { useUpdateProfile, useUser } from "@/hooks/auth"
import { getProfile } from "@/services/auth"

// Define the schema with required and optional fields
const profileFormSchema = z.object({
  course: z.string({ required_error: "Please select a course" }).min(2, "Please select a valid course"),
  year: z.string({ required_error: "Please select a year" }).min(1, "Please select a valid year"),
  section: z.string().optional(),
  branch: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const ProfileForm = () => {
  const { toast } = useToast()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const {data}:any = useUser();
  const user = data?.data

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      course: "",
      year: "",
      section: "",
      branch: "",
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
    
      setIsLoading(true)
      try {
        const res: any = await getProfile()
        if (res?.success) {
          setProfile(res.data)


          form.reset({
            course: res.data?.course || "",
            year: res.data?.year || "",
            section: res.data?.section || "",
            branch: res.data?.branch || "",
          })
        } else {
          toast({
            title: "Error fetching profile",
            description: res?.message || "Could not load profile data",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [toast, form])

  function onSubmit(data: ProfileFormValues) {
    setShowConfirmation(true)
  }

  function handleConfirm() {
    const values = form.getValues()
    const newValuesOnly: Partial<ProfileFormValues> = {}
  
    for (const key in values) {
      const typedKey = key as keyof ProfileFormValues
      const wasEmptyBefore = !profile?.[typedKey]
  
      if (wasEmptyBefore && values[typedKey]) {
        newValuesOnly[typedKey] = values[typedKey]
      }
    }
  
    if (Object.keys(newValuesOnly).length === 0) {
      toast({
        title: "No new values",
        description: "You can only update fields that were previously empty.",
      })
      setShowConfirmation(false)
      return
    }

    updateProfile(newValuesOnly, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your academic information has been saved.",
        })
        setShowConfirmation(false)
      },
      onError: (error) => {
        toast({
          title: "Error updating profile",
          description: error.message || "Failed to update profile",
        })
      },
    })
  }

  const isFieldDisabled = (fieldName: keyof ProfileFormValues) => {
    if (!profile) return false

    return !!profile[fieldName]
  }

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg shadow border border-campus-gold/20 max-w-md mx-auto border-[#d4c8a8] bg-[#f9f7f1] flex justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-campus-forest border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-campus-navy">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-lg shadow border border-campus-gold/20 max-w-md mx-auto border-[#d4c8a8] bg-[#f9f7f1]">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-campus-navy mb-2">Academic Profile</h2>
        <p className="text-sm text-muted-foreground">
          Please fill in your academic details. This information will be visible to people who interact with your
          content.
        </p>
        {profile && Object.keys(profile).some((key) => !!profile[key]) && (
          <div className="mt-2 p-2 bg-campus-gold/10 rounded-md text-xs text-campus-navy">
            Fields with existing data are displayed but cannot be modified.
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Field - Required */}
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Course <span className="text-red-500">*</span>
                </FormLabel>
                <Select disabled={isFieldDisabled("course")} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={isFieldDisabled("course") ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course: string) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Year Field - Required */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Year <span className="text-red-500">*</span>
                </FormLabel>
                <Select disabled={isFieldDisabled("year")} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={isFieldDisabled("year") ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Section Field - Optional */}
          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Section (Optional)
                </FormLabel>
                <Select disabled={isFieldDisabled("section")} onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className={isFieldDisabled("section") ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select your section" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                    <SelectItem value="E">Section E</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch Field - Optional */}
          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Branch (Optional)
                </FormLabel>
                <Select disabled={isFieldDisabled("branch")} onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className={isFieldDisabled("branch") ? "bg-gray-100" : ""}>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                   {
                    branches.map(({name, value}) => (
                      <SelectItem key={value} value={value}>
                        {name}
                      </SelectItem>
                    ))
                   }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-campus-forest hover:bg-campus-forest/90" disabled={isPending}>
            {isPending ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-campus-cream border border-campus-gold/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-playfair text-campus-navy">
              Confirm your academic details
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-campus-navy">
              You won't be able to change this information later.{" "}
              <span className="font-medium">
                When someone confesses about you, they will see these details to identify you.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-campus-gold/30 text-campus-navy hover:bg-campus-gold/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-campus-forest text-white hover:bg-campus-forest/90"
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "I understand, save my profile"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ProfileForm
