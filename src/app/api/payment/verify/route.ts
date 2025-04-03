import { NextResponse } from 'next/server';

// This would be replaced with actual DB storage in production
const payments = new Map();

export async function POST(request: Request) {
  try {
    const { transactionId, upiId, amount } = await request.json();

    // Store payment attempt with timestamp
    payments.set(transactionId, {
      upiId,
      amount,
      timestamp: new Date(),
      status: 'pending'
    });

    // Simulate payment verification (in production, this would check with UPI system)
    // For now, we'll auto-verify after 30 seconds
    setTimeout(async () => {
      payments.set(transactionId, {
        upiId,
        amount,
        timestamp: new Date(),
        status: 'completed'
      });

      // Increment registration count after successful payment
      try {
        await fetch('http://localhost:3000/api/stats/registrations', {
          method: 'POST'
        });
      } catch (error) {
        console.error('Failed to update registration stats:', error);
      }
    }, 30000);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID required' },
        { status: 400 }
      );
    }

    const payment = payments.get(transactionId);
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      status: payment.status,
      timestamp: payment.timestamp
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
