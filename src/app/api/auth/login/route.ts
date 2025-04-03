import { NextResponse } from 'next/server';

// This is a mock user database. In production, you'd use a real database.
let users = new Map();

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // In production, you'd verify against your database
    const user = users.get(username);
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

// Helper function to add a new user (called from registration)
export function addUser(userData: any) {
  users.set(userData.username, userData);
}
