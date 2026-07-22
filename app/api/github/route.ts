import { NextResponse } from "next/server";

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = "devadevan-b-p";

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN env variable is missing on server side" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Cache the contributions calendar for 1 hour
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `GitHub API responded with status ${res.status}: ${errText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!weeks) {
      return NextResponse.json(
        { error: "Failed to parse contributions collection from GraphQL response" },
        { status: 500 }
      );
    }

    // Flatten weeks into days list
    const days = weeks.flatMap((w: any) => w.contributionDays);

    return NextResponse.json({ days });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during fetch" },
      { status: 500 }
    );
  }
}
