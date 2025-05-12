"use client";

import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GraduationCap, Calendar, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { courses } from "@/constants/data";
import { useUpdateProfile } from "@/hooks/auth";
import { getProfile } from "@/services/auth";

const profileFormSchema = z.object({
  course: z
    .string({
      required_error: "Please select a course.",
    })
    .min(2, {
      message: "Please select a valid course.",
    }),
  year: z
    .string({
      required_error: "Please select a year.",
    })
    .min(1, {
      message: "Please select a valid year.",
    }),
  section: z
    .string({
      required_error: "Please select a section.",
    })
    .optional(),
  branch: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = () => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [formData, setFormData] = React.useState<ProfileFormValues | null>(
    null
  );
  const { toast } = useToast();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [profile, setProfile] = React.useState<any>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: formData || {},
  });

  function onSubmit(data: ProfileFormValues) {
    setFormData(data);
    setShowConfirmation(true);
  }

  function handleConfirm() {
    if (!formData) return;

    updateProfile(formData, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your academic information has been saved.",
        });
        setShowConfirmation(false);
      },
      onError: (error) => {
        toast({
          title: "Error updating profile",
          description: error.message,
        });
      },
    });
  }

  useEffect(() => {
    if (profile) {
      form.reset({
        course: profile?.course || "",
        year: profile?.year || "",
        section: profile?.section || "",
        branch: profile?.branch || "",
      });
    }

  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res:any = await getProfile();
      if(!res?.success){
        toast({
          title: "Error fetching profile",
          description: res?.message,
        });
        return;
      }
      setProfile(res?.data);
      setFormData(res?.data);
    };

    fetchProfile();
  },[])


  return (
    <div className=" p-6 rounded-lg shadow border border-campus-gold/20 max-w-md mx-auto border-[#d4c8a8] bg-[#f9f7f1]">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-campus-navy mb-2">
          Academic Profile
        </h2>
        <p className="text-sm text-muted-foreground">
          Please fill in your academic details. This information will be visible
          to people who interact with your content.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            disabled={profile?.userId?.profileCompleted}
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Course (required)
                </FormLabel>
                <Select
                  disabled={profile?.userId?.profileCompleted}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            disabled={profile?.userId?.profileCompleted}
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Year (required)
                </FormLabel>
                <Select
                disabled={profile?.userId?.profileCompleted}
                      onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            disabled={
              profile?.userId?.profileCompleted && profile?.section !== ""
            }
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Section
                </FormLabel>
                <Select
                  disabled={profile?.userId?.profileCompleted && profile?.section !== ""}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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

          <FormField
            disabled={
              profile?.userId?.profileCompleted && profile?.branch !== ""
            }
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Branch (Optional)
                </FormLabel>
                <Select
                 disabled={
                    profile?.userId?.profileCompleted && profile?.branch !== ""
                  }
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">
                      Electronics & Communication
                    </SelectItem>
                    <SelectItem value="ee">Electrical Engineering</SelectItem>
                    <SelectItem value="me">Mechanical Engineering</SelectItem>
                    <SelectItem value="ce">Civil Engineering</SelectItem>
                    <SelectItem value="ch">Chemical Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-campus-forest hover:bg-campus-forest/90"
          >
            Save Profile
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
                When someone confesses about you, they will see these details to
                identify you.
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
              {!isPending ? "I understand, save my profile" : "Saving..."}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileForm;
