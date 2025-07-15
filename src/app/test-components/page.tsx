import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Layout from "@/components/Layout";

export default function TestComponents() {
  return (
    <Layout>
      <div className="p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nb-gold mb-2">
            Shadcn/UI Components with National Bonds Theme
          </h1>
          <p className="text-nb-nickel">
            Testing components styled with National Bonds corporate colors
          </p>
        </div>

        {/* Button Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-nb-nickel">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary Gold</Button>
            <Button variant="secondary">Secondary Nickel</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Card Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-nb-nickel">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-nb-gold">
                  National Bonds Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nb-nickel">
                  This card uses the National Bonds styling with corporate
                  colors.
                </p>
                <Button className="mt-4" variant="default">
                  Gold Action
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-nb-secondary-blue">
                  Secondary Theme Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nb-nickel">
                  This card demonstrates the secondary B2C colors.
                </p>
                <Button className="mt-4" variant="secondary">
                  Nickel Action
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog Example */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-nb-nickel">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-nb-gold">
                  National Bonds Dialog
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-nb-nickel">
                  This dialog demonstrates the National Bonds themed components.
                </p>
                <div className="flex gap-4">
                  <Button variant="default">Gold Button</Button>
                  <Button variant="secondary">Nickel Button</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Color Palette Display */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-nb-nickel">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-gold rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Gold Primary</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-nickel rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Nickel Primary</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-secondary-red rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Secondary Red</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-secondary-blue rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Secondary Blue</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-secondary-green rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Secondary Green</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-nb-secondary-purple rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-nb-nickel">Secondary Purple</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
