import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Nov 24", value: 400 },
  { name: "Nov 25", value: 350 },
  { name: "Nov 26", value: 500 },
  { name: "Nov 27", value: 650 },
  { name: "Nov 28", value: 300 },
  { name: "Nov 29", value: 450 },
  { name: "Nov 30", value: 600 },
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8">

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">Rs.1,250.00</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Trending up this month
            </p>
            <span className="flex items-center text-green-500">
              <ArrowUpRight className="h-4 w-4" /> 12.5%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Customers</CardDescription>
            <CardTitle className="text-3xl">1,234</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Down 20% this period
            </p>
            <span className="flex items-center text-red-500">
              <ArrowDownRight className="h-4 w-4" /> 20%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Accounts</CardDescription>
            <CardTitle className="text-3xl">45,678</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Strong user retention
            </p>
            <span className="flex items-center text-green-500">
              <ArrowUpRight className="h-4 w-4" /> 12.5%
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Growth Rate</CardDescription>
            <CardTitle className="text-3xl">4.5%</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Steady performance increase
            </p>
            <span className="flex items-center text-green-500">
              <ArrowUpRight className="h-4 w-4" /> 4.5%
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Visitors Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>
              Total for the last 3 months
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Last 3 months</Button>
            <Button variant="outline">Last 30 days</Button>
            <Button variant="outline">Last 7 days</Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="15%" stopColor="#3b82f6" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1d4ed8"
                  fill="url(#fill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
