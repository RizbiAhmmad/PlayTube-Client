"use client"

import { createMediaAction } from "@/app/(dashboardLayout)/admin/dashboard/media-management/_action"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  type ICreateMediaFormValues,
} from "@/zod/media.validation"
import { MediaType, PricingType } from "@/types/media.types"
import { useForm } from "@tanstack/react-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "sonner"

const defaultValues: ICreateMediaFormValues = {
  title: "",
  description: "",
  type: "MOVIE",
  releaseYear: new Date().getFullYear(),
  director: "",
  cast: [],
  genres: [],
  trailerUrl: "",
  streamingUrl: "",
  pricingType: "FREE",
  price: 0,
}

const CreateMediaFormModal = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createMediaAction,
  })

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!file) {
        toast.error("Please upload a thumbnail")
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      
      // Append other fields
      Object.keys(value).forEach((key) => {
        const val = value[key as keyof ICreateMediaFormValues]
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            formData.append(key, JSON.stringify(val))
          } else {
            formData.append(key, val.toString())
          }
        }
      })

      const result = await mutateAsync(formData)

      if (!result.success) {
        toast.error(result.message || "Failed to create media")
        return
      }

      toast.success(result.message || "Media created successfully")
      setOpen(false)
      form.reset()
      setFile(null)
      setPreview(null)

      void queryClient.invalidateQueries({ queryKey: ["media"] })
      router.refresh()
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen)
      if (!nextOpen) {
        form.reset()
        setFile(null)
        setPreview(null)
      }
    },
    [form],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="ml-auto shrink-0">
          <Plus className="size-4" />
          Add New Media
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[95vh] w-[calc(100vw-1.5rem)] max-w-4xl gap-0 overflow-hidden p-0"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Add New Media</DialogTitle>
          <DialogDescription>
            Enter movie or series details and upload a thumbnail.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(95vh-5.5rem)]">
          <div className="px-6 py-5">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column: Basic Info */}
                <div className="space-y-4">
                  <form.Field name="title">
                    {(field) => <AppField field={field} label="Title" placeholder="Inception" />}
                  </form.Field>

                  <form.Field name="description">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label htmlFor={field.name}>Description</Label>
                        <Textarea
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Brief summary of the content..."
                          className="h-24 resize-none"
                        />
                      </div>
                    )}
                  </form.Field>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="type">
                      {(field) => (
                        <div className="space-y-1.5">
                          <Label>Type</Label>
                          <Select
                            value={field.state.value || ""}
                            onValueChange={(value: string) => field.handleChange(value as MediaType)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MOVIE">Movie</SelectItem>
                              <SelectItem value="SERIES">Series</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="releaseYear">
                      {(field) => <AppField field={field} label="Release Year" type="number" />}
                    </form.Field>
                  </div>

                  <form.Field name="director">
                    {(field) => <AppField field={field} label="Director" placeholder="Christopher Nolan" />}
                  </form.Field>
                </div>

                {/* Right Column: Media & Pricing */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    {!preview ? (
                      <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/80">
                        <Upload className="mb-2 size-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground text-center px-4">Click to upload thumbnail</span>
                        <Input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    ) : (
                      <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                        <Image src={preview} alt="Preview" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                        <Button type="button" variant="destructive" size="icon" className="absolute right-1 top-1 size-6 rounded-full" onClick={() => {setFile(null); setPreview(null);}}>
                          <X className="size-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <form.Field name="cast">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label>Cast (Comma separated)</Label>
                        <Input
                          placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt"
                          value={field.state.value?.join(", ") || ""}
                          onChange={(e) => field.handleChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="genres">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label>Genres (Comma separated)</Label>
                        <Input
                          placeholder="Sci-Fi, Action, Thriller"
                          value={field.state.value?.join(", ") || ""}
                          onChange={(e) => field.handleChange(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        />
                      </div>
                    )}
                  </form.Field>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field name="pricingType">
                      {(field) => (
                        <div className="space-y-1.5">
                          <Label>Pricing</Label>
                          <Select
                            value={field.state.value || ""}
                            onValueChange={(value: string) => field.handleChange(value as PricingType)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FREE">Free</SelectItem>
                              <SelectItem value="PREMIUM">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>

                    <form.Field name="price">
                      {(field) => (
                        <AppField 
                          field={field} 
                          label="Price" 
                          type="number" 
                          disabled={form.getFieldValue("pricingType") === "FREE"}
                        />
                      )}
                    </form.Field>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <form.Field name="trailerUrl">
                  {(field) => <AppField field={field} label="Trailer URL (YouTube)" placeholder="https://youtube.com/..." />}
                </form.Field>
                <form.Field name="streamingUrl">
                  {(field) => <AppField field={field} label="Streaming URL" placeholder="https://..." />}
                </form.Field>
              </div>

              <DialogFooter className="border-t pt-5">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <AppSubmitButton isPending={isPending} pendingLabel="Uploading..." className="w-auto">
                  Create Media
                </AppSubmitButton>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMediaFormModal
