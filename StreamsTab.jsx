import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function StreamsTab() {
  const [streamsData, setStreamsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStreams() {
      setLoading(true);
      try {
        const res = await fetch('/api/streams');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setStreamsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStreams();
  }, []);

  return (
    <Card className="rounded-2xl shadow p-4">
      <CardHeader>
        <CardTitle>Streams</CardTitle>
      </CardHeader>
      <Tabs defaultValue="streams">
        <TabsList className="mb-4">
          <TabsTrigger value="streams">Daily Streams</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="streams">
          {loading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {streamsData.map(item => (
                <Card key={item.artistId} className="p-2">
                  <CardContent>
                    <h3 className="text-lg font-semibold">{item.artistId}</h3>
                    <p className="text-2xl mt-2">{item.streams.toLocaleString()} 🎧</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="overview">
          <p>Overview content coming soon.</p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
