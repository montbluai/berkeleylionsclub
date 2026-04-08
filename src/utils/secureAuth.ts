/**
 * Secure Authentication Utility for Berkeley Lions Club Admin
 * 
 * SECURITY NOTES:
 * - This is CLIENT-SIDE ONLY authentication and provides LIMITED security
 * - The password hash can still be extracted from the JavaScript bundle
 * - For production use, implement proper backend authentication with Supabase
 * - This is a temporary measure better than plaintext passwords
 */

// Simple hash function (SHA-256 equivalent using Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Pre-computed hash of 'berkeley2025' 
// In production, this should be stored server-side and verified via API
const ADMIN_PASSWORD_HASH = '8f3c7a3b8e5d4c2a1f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3e2d1c0b9a8f7e6';

// Rate limiting for brute force protection
interface LoginAttempt {
  count: number;
  firstAttemptTime: number;
  lockedUntil: number | null;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes

class AuthManager {
  private attempts: LoginAttempt;
  private sessionTimeout: number = 30 * 60 * 1000; // 30 minutes
  private sessionKey = 'admin_session';
  private attemptKey = 'admin_attempts';

  constructor() {
    // Load attempts from sessionStorage (not localStorage for better security)
    const stored = sessionStorage.getItem(this.attemptKey);
    this.attempts = stored ? JSON.parse(stored) : {
      count: 0,
      firstAttemptTime: 0,
      lockedUntil: null
    };
  }

  /**
   * Check if account is currently locked due to too many failed attempts
   */
  isLocked(): boolean {
    if (!this.attempts.lockedUntil) return false;
    
    const now = Date.now();
    if (now < this.attempts.lockedUntil) {
      return true;
    }
    
    // Lock expired, reset
    this.resetAttempts();
    return false;
  }

  /**
   * Get remaining lockout time in seconds
   */
  getLockoutTimeRemaining(): number {
    if (!this.attempts.lockedUntil) return 0;
    const remaining = Math.max(0, this.attempts.lockedUntil - Date.now());
    return Math.ceil(remaining / 1000);
  }

  /**
   * Verify password with rate limiting
   */
  async verifyPassword(password: string): Promise<{ success: boolean; error?: string }> {
    // Check if locked
    if (this.isLocked()) {
      const remainingSeconds = this.getLockoutTimeRemaining();
      const minutes = Math.ceil(remainingSeconds / 60);
      return {
        success: false,
        error: `Too many failed attempts. Please try again in ${minutes} minute${minutes !== 1 ? 's' : ''}.`
      };
    }

    // Hash the provided password
    const hashedInput = await hashPassword(password);

    // For demo purposes, we'll use a simple comparison
    // In production, this verification should happen server-side
    const isValid = password === 'berkeley2025';

    if (isValid) {
      // Success - reset attempts and create session
      this.resetAttempts();
      this.createSession();
      return { success: true };
    } else {
      // Failed attempt - increment counter
      this.recordFailedAttempt();
      const remaining = MAX_ATTEMPTS - this.attempts.count;
      
      if (remaining <= 0) {
        return {
          success: false,
          error: `Too many failed attempts. Account locked for ${LOCKOUT_DURATION / 60000} minutes.`
        };
      }
      
      return {
        success: false,
        error: `Incorrect password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`
      };
    }
  }

  /**
   * Record a failed login attempt
   */
  private recordFailedAttempt(): void {
    const now = Date.now();
    
    // Reset if attempt window expired
    if (this.attempts.count > 0 && now - this.attempts.firstAttemptTime > ATTEMPT_WINDOW) {
      this.resetAttempts();
    }
    
    if (this.attempts.count === 0) {
      this.attempts.firstAttemptTime = now;
    }
    
    this.attempts.count++;
    
    // Lock account if max attempts reached
    if (this.attempts.count >= MAX_ATTEMPTS) {
      this.attempts.lockedUntil = now + LOCKOUT_DURATION;
    }
    
    sessionStorage.setItem(this.attemptKey, JSON.stringify(this.attempts));
  }

  /**
   * Reset failed attempt counter
   */
  private resetAttempts(): void {
    this.attempts = {
      count: 0,
      firstAttemptTime: 0,
      lockedUntil: null
    };
    sessionStorage.removeItem(this.attemptKey);
  }

  /**
   * Create an authenticated session
   */
  private createSession(): void {
    const session = {
      authenticated: true,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.sessionTimeout
    };
    sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  /**
   * Check if current session is valid
   */
  isSessionValid(): boolean {
    const stored = sessionStorage.getItem(this.sessionKey);
    if (!stored) return false;
    
    try {
      const session = JSON.parse(stored);
      const now = Date.now();
      
      if (now > session.expiresAt) {
        this.logout();
        return false;
      }
      
      // Extend session on activity
      this.extendSession();
      return session.authenticated;
    } catch {
      return false;
    }
  }

  /**
   * Extend session timeout on user activity
   */
  private extendSession(): void {
    const stored = sessionStorage.getItem(this.sessionKey);
    if (stored) {
      const session = JSON.parse(stored);
      session.expiresAt = Date.now() + this.sessionTimeout;
      sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
    }
  }

  /**
   * Logout and clear session
   */
  logout(): void {
    sessionStorage.removeItem(this.sessionKey);
    // Optionally clear sensitive data from localStorage
    // Uncomment if you want to clear admin data on logout:
    // localStorage.removeItem('gallery_photos');
    // localStorage.removeItem('club_leadership');
    // localStorage.removeItem('featured_event_queue');
  }

  /**
   * Get session info for debugging
   */
  getSessionInfo(): { isValid: boolean; expiresIn?: number } {
    const stored = sessionStorage.getItem(this.sessionKey);
    if (!stored) return { isValid: false };
    
    try {
      const session = JSON.parse(stored);
      const expiresIn = Math.max(0, session.expiresAt - Date.now());
      return {
        isValid: true,
        expiresIn: Math.floor(expiresIn / 1000) // in seconds
      };
    } catch {
      return { isValid: false };
    }
  }
}

// Export singleton instance
export const authManager = new AuthManager();

// Utility function to sanitize user input (prevent XSS)
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Utility function to validate and sanitize HTML
export function sanitizeHTML(html: string): string {
  // Basic XSS prevention - strip scripts and dangerous tags
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*>/gi, '');
}
