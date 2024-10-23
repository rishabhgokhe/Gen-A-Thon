import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowBigDown } from "lucide-react";

export default function FilterTabs() {
  // Track selected filters in state
  const [selectedFilters, setSelectedFilters] = useState({
    Incoming: false,
    Outgoing: false,
    Completed: false,
    Missed: false,
  });

  // Function to toggle filter state
  const toggleFilter = (filterName) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Button Filters */}
      <Button
        variant="outline"
        style={{
          backgroundColor: selectedFilters.Incoming ? "#2C81FF" : "transparent",
          color: selectedFilters.Incoming ? "white" : "black",
        }}
        onClick={() => toggleFilter("Incoming")}
      >
        Incoming Calls
      </Button>

      <Button
        variant="outline"
        style={{
          backgroundColor: selectedFilters.Outgoing ? "#2C81FF" : "transparent",
          color: selectedFilters.Outgoing ? "white" : "black",
        }}
        onClick={() => toggleFilter("Outgoing")}
      >
        Outgoing Calls
      </Button>

      <Button
        variant="outline"
        style={{
          backgroundColor: selectedFilters.Completed ? "#2C81FF" : "transparent",
          color: selectedFilters.Completed ? "white" : "black",
        }}
        onClick={() => toggleFilter("Completed")}
      >
        Completed Calls
      </Button>

      <Button
        variant="outline"
        style={{
          backgroundColor: selectedFilters.Missed ? "#2C81FF" : "transparent",
          color: selectedFilters.Missed ? "white" : "black",
        }}
        onClick={() => toggleFilter("Missed")}
      >
        Missed Calls
      </Button>

      {/* Dropdown for additional filters */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            More Filters
            <ArrowBigDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <span>Answered</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Unanswered</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Rating ≥ 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Call Outcome: Successful</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Call Outcome: Unsuccessful</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}