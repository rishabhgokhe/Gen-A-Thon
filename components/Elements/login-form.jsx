"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [filterType, setFilterType] = useState("Incoming"); // Default filter
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch CSV from public folder and filter data
  const handleFilter = () => {
    setLoading(true);
    fetch("/call_data.csv") // Assumes CSV file is in the public folder
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const data = results.data;
            const filtered = data.filter(
              (row) => row["Call Type"] && row["Call Type"].trim() === filterType
            );
            setFilteredData(filtered);
            setLoading(false);
          },
          error: (err) => {
            console.error("Error parsing CSV: ", err);
            setLoading(false);
          },
        });
      });
  };

  // Download filtered data as CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "filtered_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Filter Call Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="filterType">Select Call Type</Label>
            <Input
              as="select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              id="filterType"
            >
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </Input>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleFilter} disabled={loading}>
            {loading ? "Filtering..." : "Filter Data"}
          </Button>
          {filteredData.length > 0 && (
            <Button onClick={downloadCSV}>Download Filtered CSV</Button>
          )}
        </CardFooter>
      </Card>

      {/* Optional: Log Filtered Data */}
      {filteredData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-4">Filtered Call Logs</h2>
          <pre className="text-sm">{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}