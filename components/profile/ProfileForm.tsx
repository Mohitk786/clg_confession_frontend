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
import { GraduationCap, Calendar, Book, Sparkles } from "lucide-react"
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
  const { data }: any = useUser()
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
      <div className="campus-gradient flex items-center justify-center p-4">
        <div className="campus-card max-w-md w-full p-8">
          <div className="text-center">
            <div className="campus-shimmer h-12 w-12 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-playfair font-semibold text-campus-navy mb-2">Loading Profile</h3>
            <p className="text-campus-navy/70 text-sm">Fetching your academic details...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="campus-gradient flex items-center justify-center p-4">
      <div className="campus-card max-w-lg w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 campus-gradient-bg rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-playfair font-bold campus-gradient-text mb-3">Academic Profile</h2>
          <p className="text-campus-navy/70 leading-relaxed">
            Complete your academic details to help others identify you when they interact with your content.
          </p>

          {profile && Object.keys(profile).some((key) => !!profile[key]) && (
            <div className="mt-4 p-3 bg-campus-gold/10 border border-campus-gold/20 rounded-lg text-sm text-campus-navy">
              <Sparkles className="h-4 w-4 inline mr-2" />
              Fields with existing data cannot be modified
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-campus-navy font-medium">
                    <GraduationCap className="h-4 w-4 text-campus-forest" />
                    Course <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select disabled={isFieldDisabled("course")} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`campus-input ${isFieldDisabled("course") ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <SelectValue placeholder="Select your course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="campus-card border-campus-gold/20">
                      {courses.map((course: string) => (
                        <SelectItem key={course} value={course} className="hover:bg-campus-gold/10">
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-campus-navy font-medium">
                    <Calendar className="h-4 w-4 text-campus-forest" />
                    Year <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select disabled={isFieldDisabled("year")} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={`campus-input ${isFieldDisabled("year") ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="campus-card border-campus-gold/20">
                      <SelectItem value="1" className="hover:bg-campus-gold/10">
                        1st Year
                      </SelectItem>
                      <SelectItem value="2" className="hover:bg-campus-gold/10">
                        2nd Year
                      </SelectItem>
                      <SelectItem value="3" className="hover:bg-campus-gold/10">
                        3rd Year
                      </SelectItem>
                      <SelectItem value="4" className="hover:bg-campus-gold/10">
                        4th Year
                      </SelectItem>
                      <SelectItem value="5" className="hover:bg-campus-gold/10">
                        5th Year
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-campus-navy font-medium">
                    <Book className="h-4 w-4 text-campus-forest" />
                    Section <span className="text-campus-navy/50 text-sm">(Optional)</span>
                  </FormLabel>
                  <Select
                    disabled={isFieldDisabled("section")}
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`campus-input ${isFieldDisabled("section") ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <SelectValue placeholder="Select your section" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="campus-card border-campus-gold/20">
                      <SelectItem value="A" className="hover:bg-campus-gold/10">
                        Section A
                      </SelectItem>
                      <SelectItem value="B" className="hover:bg-campus-gold/10">
                        Section B
                      </SelectItem>
                      <SelectItem value="C" className="hover:bg-campus-gold/10">
                        Section C
                      </SelectItem>
                      <SelectItem value="D" className="hover:bg-campus-gold/10">
                        Section D
                      </SelectItem>
                      <SelectItem value="E" className="hover:bg-campus-gold/10">
                        Section E
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-campus-navy font-medium">
                    <Book className="h-4 w-4 text-campus-forest" />
                    Branch <span className="text-campus-navy/50 text-sm">(Optional)</span>
                  </FormLabel>
                  <Select disabled={isFieldDisabled("branch")} onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger
                        className={`campus-input ${isFieldDisabled("branch") ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="campus-card border-campus-gold/20">
                      {branches.map(({ name, value }) => (
                        <SelectItem key={value} value={value} className="hover:bg-campus-gold/10">
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full campus-btn-primary h-12 text-base font-medium" disabled={isPending}>
              {isPending ? (
                <>
                  <div className="campus-shimmer h-4 w-4 rounded-full mr-2"></div>
                  Saving Profile...
                </>
              ) : (
                <>
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Save Academic Profile
                </>
              )}
            </Button>
          </form>
        </Form>

        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent className="campus-card border-campus-gold/30 max-w-md">
            <AlertDialogHeader>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 campus-gradient-bg rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <AlertDialogTitle className="font-playfair text-xl campus-gradient-text text-center">
                Confirm Academic Details
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-campus-navy/70 leading-relaxed">
                Once saved, this information cannot be changed. When someone mentions you in confessions,
                <span className="font-medium text-campus-navy"> these details will help identify you.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-3">
              <AlertDialogCancel className="campus-btn-secondary w-full sm:w-auto">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="campus-btn-primary w-full sm:w-auto"
                onClick={handleConfirm}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="campus-shimmer h-4 w-4 rounded-full mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default ProfileForm
