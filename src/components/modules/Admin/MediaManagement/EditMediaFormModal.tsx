"use client";

import { updateMediaAction } from "@/app/(dashboardLayout)/admin/dashboard/media-management/_action";
import AppField from "@/components/shared/form/AppField";
import AppRichTextEditor from "@/components/shared/form/AppRichTextEditor";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type IUpdateMediaFormValues } from "@/zod/media.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { toast } from "sonner";
import { IMedia, MediaType, PricingType } from "@/types/media.types";

interface EditMediaFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  media: IMedia | null;
}

const getInitialValues = (media: IMedia | null): IUpdateMediaFormValues => ({
  title: media?.title ?? "",
  description: media?.description ?? "",
  type: media?.type ?? "MOVIE",
  releaseYear: media?.releaseYear ?? new Date().getFullYear(),
  director: media?.director ?? "",
  cast: media?.cast ?? [],
  genres: media?.genres ?? [],
  trailerUrl: media?.trailerUrl ?? "",
  streamingUrl: media?.streamingUrl ?? "",
  pricingType: media?.pricingType ?? "FREE",
  price: media?.price ?? 0,
});

const EditMediaFormModal = ({
  open,
  onOpenChange,
  media,
}: EditMediaFormModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    media?.thumbnail ?? null,
  );

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateMediaAction(id, formData),
  });

  const form = useForm({
    defaultValues: getInitialValues(media),
    onSubmit: async ({ value }) => {
      if (!media) return;

      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }

      Object.keys(value).forEach((key) => {
        const val = value[key as keyof IUpdateMediaFormValues];
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            formData.append(key, JSON.stringify(val));
          } else {
            formData.append(key, val.toString());
          }
        }
      });

      const result = await mutateAsync({ id: media.id, formData });

      if (!result.success) {
        toast.error(result.message || "Failed to update media");
        return;
      }

      toast.success(result.message || "Media updated successfully");
      onOpenChange(false);

      void queryClient.invalidateQueries({ queryKey: ["media"] });
      router.refresh();
    },
  });

  useEffect(() => {
    if (open && media) {
      form.reset(getInitialValues(media));
      // To avoid synchronous setState in effect warning,
      // we can use a small delay or ensure this only runs once per open
      const timeoutId = setTimeout(() => {
        setPreview(media.thumbnail);
        setFile(null);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [open, media, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[95vh] w-[calc(100vw-1.5rem)] max-w-5xl gap-0 overflow-hidden p-0"
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Edit Media</DialogTitle>
          <DialogDescription>
            Update movie or series details. Leave thumbnail empty to keep
            current.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(95vh-5.5rem)]">
          <div className="px-6 py-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <form.Field name="title">
                    {(field) => <AppField field={field} label="Title" />}
                  </form.Field>

                  <form.Field name="description">
                    {(field) => (
                      <div className="space-y-1.5 px-0.5">
                        <Label>Description</Label>
                        <AppRichTextEditor
                          value={field.state.value || ""}
                          onChange={(val) => field.handleChange(val)}
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
                            onValueChange={(v: string) =>
                              field.handleChange(v as MediaType)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
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
                      {(field) => (
                        <AppField
                          field={field}
                          label="Release Year"
                          type="number"
                        />
                      )}
                    </form.Field>
                  </div>

                  <form.Field name="director">
                    {(field) => <AppField field={field} label="Director" />}
                  </form.Field>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Thumbnail (Optional)</Label>
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted">
                      {preview && (
                        <Image
                          src={preview}
                          alt="Thumbnail"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      )}
                      <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                        <Upload className="size-8 text-white" />
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  <form.Field name="cast">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label>Cast (Comma separated)</Label>
                        <Input
                          value={field.state.value?.join(", ") || ""}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            )
                          }
                        />
                      </div>
                    )}
                  </form.Field>

                  <form.Field name="genres">
                    {(field) => (
                      <div className="space-y-1.5">
                        <Label>Genres (Comma separated)</Label>
                        <Input
                          value={field.state.value?.join(", ") || ""}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            )
                          }
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
                            onValueChange={(v: string) =>
                              field.handleChange(v as PricingType)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FREE">Free</SelectItem>
                              <SelectItem value="PREMIUM">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </form.Field>
                    <form.Subscribe selector={(state) => state.values.pricingType}>
                      {(pricingType) => (
                        <form.Field name="price">
                          {(field) => (
                            <AppField
                              field={field}
                              label="Price"
                              type="number"
                              disabled={pricingType === "FREE"}
                            />
                          )}
                        </form.Field>
                      )}
                    </form.Subscribe>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <form.Field name="trailerUrl">
                  {(field) => <AppField field={field} label="Trailer URL" />}
                </form.Field>
                <form.Field name="streamingUrl">
                  {(field) => <AppField field={field} label="Streaming URL" />}
                </form.Field>
              </div>

              <DialogFooter className="border-t pt-5">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <AppSubmitButton
                  isPending={isPending}
                  pendingLabel="Updating..."
                  className="w-auto"
                >
                  Save Changes
                </AppSubmitButton>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditMediaFormModal;
