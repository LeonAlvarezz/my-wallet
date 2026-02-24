import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import StatsCard from "../components/stats-card/StatsCard";
import CategoryBreakdown, {
  type CategoryData,
} from "../components/category-breakdown/CategoryBreakdown";
import DailyGroup, {
  type DailyGroupData,
} from "../components/daily-group/DailyGroup";

// Mock data
const mockCategories: CategoryData[] = [
  {
    id: "food",
    name: "Food & Dining",
    icon: "solar:donut-bold-duotone",
    color: "green",
    amount: 345.5,
    percentage: 35,
  },
  {
    id: "travel",
    name: "Travel",
    icon: "solar:bicycling-bold-duotone",
    color: "blue",
    amount: 220.0,
    percentage: 22,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "solar:play-bold-duotone",
    color: "purple",
    amount: 180.75,
    percentage: 18,
  },
  {
    id: "shopping",
    name: "Shopping",
    icon: "solar:bag-bold-duotone",
    color: "pink",
    amount: 165.25,
    percentage: 17,
  },
  {
    id: "utilities",
    name: "Utilities",
    icon: "solar:lightbulb-bolt-bold-duotone",
    color: "orange",
    amount: 88.5,
    percentage: 8,
  },
];

const mockTransactions: DailyGroupData[] = [
  {
    date: "Feb 24, 2025",
    label: "Today",
    total: 85.5,
    transactions: [
      {
        id: "txn-1",
        icon: "solar:donut-bold-duotone",
        time: "2:30 PM",
        name: "Pasta Heaven",
        category: "Food & Dining",
        amount: 28.5,
        categoryColor: "green",
      },
      {
        id: "txn-2",
        icon: "solar:cup-paper-bold-duotone",
        time: "10:15 AM",
        name: "Starbucks Coffee",
        category: "Food & Dining",
        amount: 6.8,
        categoryColor: "green",
      },
      {
        id: "txn-3",
        icon: "solar:bag-bold-duotone",
        time: "4:45 PM",
        name: "Target",
        category: "Shopping",
        amount: 50.2,
        categoryColor: "pink",
      },
    ],
  },
  {
    date: "Feb 23, 2025",
    label: "Yesterday",
    total: 156.3,
    transactions: [
      {
        id: "txn-4",
        icon: "solar:bicycling-bold-duotone",
        time: "3:20 PM",
        name: "Uber",
        category: "Travel",
        amount: 18.5,
        categoryColor: "blue",
      },
      {
        id: "txn-5",
        icon: "solar:play-bold-duotone",
        time: "7:00 PM",
        name: "Netflix Subscription",
        category: "Entertainment",
        amount: 15.99,
        categoryColor: "purple",
      },
      {
        id: "txn-6",
        icon: "solar:donut-bold-duotone",
        time: "12:30 PM",
        name: "Pizza Place",
        category: "Food & Dining",
        amount: 32.4,
        categoryColor: "green",
      },
      {
        id: "txn-7",
        icon: "solar:lightbulb-bolt-bold-duotone",
        time: "9:00 AM",
        name: "Electric Bill",
        category: "Utilities",
        amount: 89.36,
        categoryColor: "orange",
      },
    ],
  },
  {
    date: "Feb 22, 2025",
    label: "Sat, Feb 22",
    total: 234.8,
    transactions: [
      {
        id: "txn-8",
        icon: "solar:bag-bold-duotone",
        time: "2:15 PM",
        name: "Zara",
        category: "Shopping",
        amount: 115.05,
        categoryColor: "pink",
      },
      {
        id: "txn-9",
        icon: "solar:play-bold-duotone",
        time: "6:30 PM",
        name: "Movie Tickets",
        category: "Entertainment",
        amount: 32.5,
        categoryColor: "purple",
      },
      {
        id: "txn-10",
        icon: "solar:donut-bold-duotone",
        time: "1:00 PM",
        name: "Lunch with Friends",
        category: "Food & Dining",
        amount: 87.25,
        categoryColor: "green",
      },
    ],
  },
];

export default function TransactionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate stats
  const totalSpent = mockCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const avgPerTransaction =
    totalSpent /
    mockTransactions.reduce((sum, day) => sum + day.transactions.length, 0);
  const highestTransaction = Math.max(
    ...mockTransactions
      .flat(2)
      .map((day: any) =>
        Math.max(...day.transactions.map((t: any) => t.amount)),
      ),
  );

  // Filter transactions based on selected category
  const filteredTransactions = selectedCategory
    ? mockTransactions.map((day) => ({
        ...day,
        transactions: day.transactions.filter((t) => {
          const category = mockCategories.find(
            (c) => c.id === selectedCategory,
          );
          return t.category === category?.name;
        }),
      }))
    : mockTransactions;

  const displayTransactions = filteredTransactions.filter(
    (day) => day.transactions.length > 0,
  );

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-total-h)+1rem)]">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Icon
          icon="solar:magnifer-bold"
          className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
      </div>

      {/* At a Glance Stats */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">At a Glance</h2>
          <Button variant="ghost" size="sm">
            This Month
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatsCard
            title="Total Spent"
            amount={totalSpent.toFixed(2)}
            icon="solar:wallet-bold"
            className="sm:col-span-2"
          />
          <StatsCard
            title="Average"
            amount={avgPerTransaction.toFixed(2)}
            icon="solar:chart-2-bold"
            description="per transaction"
          />
          <StatsCard
            title="Highest"
            amount={highestTransaction.toFixed(2)}
            icon="solar:arrow-up-bold"
            trend="up"
            description="single transaction"
          />
        </div>
      </section>

      {/* Category Breakdown */}
      <section>
        <CategoryBreakdown
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onCategoryClick={(categoryId) =>
            setSelectedCategory(
              selectedCategory === categoryId ? null : categoryId,
            )
          }
        />
      </section>

      {/* Transactions by Date */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {selectedCategory
              ? mockCategories.find((c) => c.id === selectedCategory)?.name
              : "All Transactions"}
          </h2>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Clear Filter
            </Button>
          )}
        </div>

        {displayTransactions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {displayTransactions.map((day) => (
              <DailyGroup key={day.date} {...day} />
            ))}
          </div>
        ) : (
          <div className="bg-card/50 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12">
            <Icon
              icon="solar:inbox-bold"
              className="text-muted-foreground size-8"
            />
            <p className="text-muted-foreground text-sm">
              No transactions found
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
