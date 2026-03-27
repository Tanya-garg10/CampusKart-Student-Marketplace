import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription
} from "@/components/ui/form";
// FormLabel used inside FormField contexts only; standalone label for image upload uses native <label>
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShop } from "@/context/ShopContext";
import { useToast } from "@/hooks/use-toast";

const sellSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  condition: z.enum(["New", "Used"], { required_error: "Please select condition" }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Please specify meetup location on campus"),
});

type SellFormValues = z.infer<typeof sellSchema>;

export default function Sell() {
  const [, setLocation] = useLocation();
  const { addProduct } = useShop();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      condition: "Used",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (data: SellFormValues) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    addProduct({
      ...data,
      seller: "Current User" // Mock logged in user
    });
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({
      title: "Product Listed Successfully!",
      description: "Your item is now live on CampusKart.",
    });
    
    setTimeout(() => {
      setLocation("/products");
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-border text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Awesome!</h2>
          <p className="text-muted-foreground mb-8">Your product has been listed. Redirecting you to the marketplace...</p>
          <Button onClick={() => setLocation("/products")} className="w-full rounded-xl" size="lg">
            View My Listing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-12 bg-muted/20">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/2 bg-primary/5 blur-[100px] rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-accent/5 blur-[100px] rounded-tr-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-foreground">Sell an Item</h1>
          <p className="text-muted-foreground mt-2 text-lg">Turn your old books and gadgets into cash.</p>
        </div>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-6 sm:p-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Image Upload Mock */}
              <div className="space-y-3">
                <label className="text-base font-medium text-foreground">Product Image</label>
                <div className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Listing Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Calculus 8th Edition Textbook" className="h-12 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="450" className="h-12 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Books">Books & Textbooks</SelectItem>
                          <SelectItem value="Notes">Study Notes</SelectItem>
                          <SelectItem value="Gadgets">Gadgets & Tech</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border border-border p-4 flex-1 cursor-pointer hover:bg-muted/20 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="New" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">New (Unused)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-xl border border-border p-4 flex-1 cursor-pointer hover:bg-muted/20 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="Used" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer w-full">Used</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the item, any flaws, reasons for selling..." 
                        className="min-h-[120px] rounded-xl resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meetup Location</FormLabel>
                    <FormDescription>Where on campus can the buyer pick this up?</FormDescription>
                    <FormControl>
                      <Input placeholder="e.g. Library Cafe, Main Gate" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 p-4 rounded-xl flex gap-3 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>CampusKart promotes safe trading. Always meet in public, well-lit areas on campus during daylight hours.</p>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full sm:w-auto h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post Listing"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
