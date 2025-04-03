import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Store stats in a JSON file
const STATS_FILE = path.join(process.cwd(), 'data', 'registration-stats.json');

// Initialize stats file if it doesn't exist
async function initializeStatsFile() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    const exists = await fs.stat(STATS_FILE).catch(() => false);
    if (!exists) {
      await fs.writeFile(STATS_FILE, JSON.stringify({ 
        verifiedRegistrations: 0,
        lastUpdated: new Date().toISOString()
      }));
    }
  } catch (error) {
    console.error('Error initializing stats file:', error);
  }
}

// Get current stats
async function getStats() {
  try {
    await initializeStatsFile();
    const data = await fs.readFile(STATS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stats:', error);
    return { verifiedRegistrations: 0, lastUpdated: new Date().toISOString() };
  }
}

// Update stats
async function updateStats() {
  try {
    const stats = await getStats();
    stats.verifiedRegistrations += 1;
    stats.lastUpdated = new Date().toISOString();
    await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
    return stats;
  } catch (error) {
    console.error('Error updating stats:', error);
    throw error;
  }
}

// GET endpoint to fetch current registration count
export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch registration stats' },
      { status: 500 }
    );
  }
}

// POST endpoint to increment registration count (called after payment verification)
export async function POST() {
  try {
    const stats = await updateStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update registration stats' },
      { status: 500 }
    );
  }
}
