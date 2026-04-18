/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { createReview } from "@/services/review.services"
import { useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { reviewZodSchema } from "@/zod/review.validation"

interface ReviewFormProps {
  mediaId: string
  onSuccess?: () => void
}

const ReviewForm = ({ mediaId, onSuccess }: ReviewFormProps) => {
  const [hoverRating, setHoverRating] = useState(0)
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      rating: 0,
      spoiler: false,
      content: "",
      tags: ""
    },
    onSubmit: async ({ value }) => {
      if (value.rating === 0) {
        toast.error("Please select a rating")
        return
      }

      try {
        const payload = {
          mediaId,
          rating: value.rating,
          content: value.content,
          spoiler: value.spoiler,
          tags: value.tags ? value.tags.split(",").map(t => t.trim()).filter(Boolean) : []
        }

        const res = await createReview(payload)

        if (res.success) {
          toast.success("Review submitted! Waiting for admin approval.")
          form.reset()
          queryClient.invalidateQueries({ queryKey: ["media-reviews", mediaId] })
          queryClient.invalidateQueries({ queryKey: ["my-reviews"] })
          onSuccess?.()
        } else {
          toast.error(res.message || "Something went wrong")
        }
      } catch (error: any) {
        toast.error("Failed to submit review")
        console.log(error)
      }
    }
  })

  return (
    <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Write a Review</CardTitle>
        <CardDescription>Share your thoughts about this title with the community.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          method="POST"
          action="#"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Rating Stars (1-10) */}
          <form.Field name="rating" validators={{ onChange: reviewZodSchema.shape.rating }}>
            {(field) => (
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  Your Rating ({field.state.value > 0 ? `${field.state.value}/10` : "Select stars"})
                  {field.state.meta.errors.length > 0 && <span className="text-xs text-destructive font-normal">{field.state.meta.errors.join(", ")}</span>}
                </Label>
                <div className="flex flex-wrap gap-1">
                  {[...Array(10)].map((_, i) => {
                    const starValue = i + 1
                    return (
                      <button
                        key={i}
                        type="button"
                        className="focus:outline-none transition-transform active:scale-95"
                        onClick={() => field.handleChange(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          className={cn(
                            "size-6 transition-colors duration-200",
                            (hoverRating || field.state.value) >= starValue
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground/30"
                          )}
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name="content" validators={{ onChange: reviewZodSchema.shape.content }}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="content">Review Content</Label>
                <Textarea
                  id="content"
                  placeholder="What did you like or dislike? No spoilers unless you toggle the button below!"
                  className="min-h-[120px] rounded-xl border-muted-foreground/20 focus-visible:ring-primary"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-xs text-destructive">{field.state.meta.errors.join(", ")}</p>
                )}
              </div>
            )}
          </form.Field>

          <div className="grid gap-6 md:grid-cols-2">
             <form.Field name="tags" validators={{ onChange: reviewZodSchema.shape.tags }}>
               {(field) => (
                 <div className="space-y-2">
                    <Label htmlFor="tags">Tags (optional)</Label>
                    <Input 
                      id="tags"
                      placeholder="classic, underrated, must-watch"
                      className="rounded-xl border-muted-foreground/20"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    <p className="text-[10px] text-muted-foreground">Separate tags with commas</p>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-destructive">{field.state.meta.errors.join(", ")}</p>
                    )}
                 </div>
               )}
             </form.Field>

             <form.Field name="spoiler" validators={{ onChange: reviewZodSchema.shape.spoiler }}>
               {(field) => (
                 <div className="flex flex-col justify-center">
                    <div className="flex items-center space-x-2 rounded-xl border border-muted-foreground/10 p-4 bg-muted/30">
                      <Checkbox 
                        id="spoiler" 
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(!!checked)}
                        onBlur={field.handleBlur}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="spoiler"
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          Contains Spoilers
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Help others avoid unwanted plot reveals.
                        </p>
                      </div>
                    </div>
                 </div>
               )}
             </form.Field>
          </div>

          <div className="bg-primary/5 rounded-xl p-4 flex items-start gap-3 border border-primary/10">
            <Info className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Reviews are moderated by our team to maintain community standards. Your review will be visible once approved by an administrator.
            </p>
          </div>

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm
