# Design Document: Geolocation Handling Improvement

## Overview

This design enhances the geolocation handling in the shop creation feature by replacing generic alert dialogs with a comprehensive modal-based permission flow. The solution adds browser detection, permission state checking, clear user guidance, and alternative input methods while maintaining the existing form structure and Laravel + React (Inertia.js) architecture.

## Architecture

### Component Structure

The enhancement will be implemented primarily in the existing `Create.tsx` component with the addition of new sub-components:

```
resources/js/pages/Vendor/Shop/
├── Create.tsx (modified)
└── components/
    ├── LocationPermissionModal.tsx (new)
    └── BrowserInstructionsContent.tsx (new)

resources/js/utils/
└── browserDetector.ts (new)
```

### Data Flow

1. User clicks "Use My Current Location" button
2. System checks permission state via Permissions API
3. Based on state:
   - **Granted**: Retrieve coordinates directly
   - **Denied**: Show modal with instructions
   - **Prompt**: Request permission, then handle result
4. On success: Populate latitude/longitude fields
5. On failure: Show modal with browser-specific guidance and alternatives

## Components and Interfaces

### 1. LocationPermissionModal Component

**Purpose**: Display permission guidance, browser-specific instructions, and alternative input options.

**Props Interface**:
```typescript
interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  browserType: BrowserType;
  permissionState: PermissionState;
  onManualEntry: () => void;
  onRetry: () => void;
}
```

**State**:
- Modal visibility
- Current tab (instructions vs manual entry)

**Behavior**:
- Renders browser-specific instructions based on `browserType`
- Provides "Try Again" button to re-check permissions
- Provides "Enter Manually" button to switch to coordinate input
- Handles keyboard navigation (Escape to close, Tab trapping)
- Returns focus to trigger button on close

### 2. BrowserInstructionsContent Component

**Purpose**: Render browser-specific step-by-step instructions for enabling location permissions.

**Props Interface**:
```typescript
interface BrowserInstructionsContentProps {
  browserType: BrowserType;
}

type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown';
```

**Content Structure**:
Each browser type has:
- Icon/logo
- Step-by-step numbered instructions
- Visual indicators (e.g., "Click the lock icon in the address bar")
- Screenshot or diagram reference (optional enhancement)

### 3. Browser Detector Utility

**Purpose**: Identify the user's browser type and version.

**Function Signature**:
```typescript
function detectBrowser(): BrowserType {
  // Parse navigator.userAgent
  // Return browser type
}
```

**Detection Logic**:
- Check for Edge (Edg/ in user agent)
- Check for Chrome (Chrome/ and not Edg/)
- Check for Firefox (Firefox/)
- Check for Safari (Safari/ and not Chrome)
- Default to 'unknown'

### 4. Enhanced Create.tsx Component

**Additional State**:
```typescript
const [gettingLocation, setGettingLocation] = useState(false);
const [showPermissionModal, setShowPermissionModal] = useState(false);
const [permissionState, setPermissionState] = useState<PermissionState>('prompt');
const [browserType, setBrowserType] = useState<BrowserType>('unknown');
const [locationError, setLocationError] = useState<string | null>(null);
```

**New Functions**:

```typescript
// Check permission state before requesting location
async function checkPermissionState(): Promise<PermissionState> {
  if (!navigator.permissions) {
    return 'prompt';
  }
  
  try {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    return result.state;
  } catch (error) {
    return 'prompt';
  }
}

// Enhanced location retrieval with permission checking
async function getCurrentLocation() {
  if (!navigator.geolocation) {
    setLocationError('Geolocation is not supported by your browser');
    setShowPermissionModal(true);
    return;
  }

  setGettingLocation(true);
  setLocationError(null);

  // Check permission state first
  const state = await checkPermissionState();
  setPermissionState(state);

  if (state === 'denied') {
    setGettingLocation(false);
    setShowPermissionModal(true);
    return;
  }

  // Request location
  navigator.geolocation.getCurrentPosition(
    handleLocationSuccess,
    handleLocationError,
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Success handler
function handleLocationSuccess(position: GeolocationPosition) {
  setData('latitude', position.coords.latitude.toString());
  setData('longitude', position.coords.longitude.toString());
  setGettingLocation(false);
  // Show success feedback (optional toast notification)
}

// Error handler with specific error messages
function handleLocationError(error: GeolocationPositionError) {
  setGettingLocation(false);
  
  let errorMessage: string;
  
  switch (error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = 'Location permission was denied';
      setPermissionState('denied');
      setShowPermissionModal(true);
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = 'Location information is unavailable';
      setShowPermissionModal(true);
      break;
    case error.TIMEOUT:
      errorMessage = 'Location request timed out';
      setShowPermissionModal(true);
      break;
    default:
      errorMessage = 'An unknown error occurred';
      setShowPermissionModal(true);
  }
  
  setLocationError(errorMessage);
  console.error('Geolocation error:', error);
}

// Validate coordinate input
function validateCoordinate(value: string, type: 'latitude' | 'longitude'): boolean {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return false;
  }
  
  if (type === 'latitude') {
    return num >= -90 && num <= 90;
  } else {
    return num >= -180 && num <= 180;
  }
}
```

**Initialization**:
```typescript
useEffect(() => {
  const browser = detectBrowser();
  setBrowserType(browser);
}, []);
```

## Data Models

### Permission State Type
```typescript
type PermissionState = 'granted' | 'denied' | 'prompt';
```

### Browser Type
```typescript
type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'unknown';
```

### Geolocation Error Type
```typescript
interface GeolocationError {
  code: number;
  message: string;
  timestamp: Date;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Permission denial triggers modal display

*For any* permission denial event, the system should set the modal visibility state to true and display the permission guidance modal.

**Validates: Requirements 1.1**

### Property 2: Browser-specific instructions are displayed

*For any* detected browser type, when the permission modal is rendered, the displayed instructions should contain text specific to that browser type.

**Validates: Requirements 1.2**

### Property 3: Manual entry option is available

*For any* permission modal display, the rendered modal should include a manual coordinate entry button or link.

**Validates: Requirements 1.3**

### Property 4: Form state persists across modal interactions

*For any* form state with populated values, opening and closing the permission modal should not modify the form field values.

**Validates: Requirements 1.4**

### Property 5: Browser detection returns valid type

*For any* user agent string, the browser detector should return one of the valid browser types (chrome, firefox, safari, edge, unknown).

**Validates: Requirements 2.1**

### Property 6: Permission state is checked before location request

*For any* location button click, the system should query the permission state before calling navigator.geolocation.getCurrentPosition.

**Validates: Requirements 3.1**

### Property 7: Denied permission shows modal without new request

*For any* scenario where permission state is "denied", clicking the location button should display the modal without calling getCurrentPosition.

**Validates: Requirements 3.2**

### Property 8: Granted permission proceeds to location retrieval

*For any* scenario where permission state is "granted", clicking the location button should call getCurrentPosition to retrieve coordinates.

**Validates: Requirements 3.3**

### Property 9: Prompt permission triggers permission request

*For any* scenario where permission state is "prompt", clicking the location button should call getCurrentPosition to request permission.

**Validates: Requirements 3.4**

### Property 10: Latitude validation enforces valid range

*For any* numeric input value, the latitude validation function should return true if and only if the value is between -90 and 90 (inclusive).

**Validates: Requirements 4.2**

### Property 11: Longitude validation enforces valid range

*For any* numeric input value, the longitude validation function should return true if and only if the value is between -180 and 180 (inclusive).

**Validates: Requirements 4.3**

### Property 12: Invalid coordinates trigger error messages

*For any* invalid coordinate input (out of range or non-numeric), the system should display an error message indicating the valid range.

**Validates: Requirements 4.4**

### Property 13: Geolocation errors are logged

*For any* geolocation error event, the system should call console.error with the error details.

**Validates: Requirements 5.4**

### Property 14: No alert dialogs for geolocation errors

*For any* geolocation error scenario, the system should not call window.alert.

**Validates: Requirements 5.5**

### Property 15: Loading indicator displays during location request

*For any* location button click that initiates a location request, the loading state should be set to true until the request completes or fails.

**Validates: Requirements 6.1**

### Property 16: Successful location retrieval populates form fields

*For any* successful geolocation response, the latitude and longitude form fields should be populated with the coordinate values from the response.

**Validates: Requirements 6.2, 6.4**

### Property 17: Modal is dismissible via Escape key

*For any* open permission modal, pressing the Escape key should close the modal (set visibility to false).

**Validates: Requirements 6.5**

### Property 18: Modal displays with focus on content

*For any* permission modal opening, the document.activeElement should be within the modal content after opening.

**Validates: Requirements 7.1**

### Property 19: Focus is trapped within modal

*For any* open permission modal, tabbing through focusable elements should cycle focus within the modal boundaries without escaping to the page behind.

**Validates: Requirements 7.2**

### Property 20: Focus returns to trigger button on close

*For any* permission modal closing, the document.activeElement should be the location button that triggered the modal.

**Validates: Requirements 7.3**

### Property 21: Modal includes required ARIA attributes

*For any* rendered permission modal, the modal element should include role="dialog", aria-modal="true", and aria-labelledby attributes.

**Validates: Requirements 7.4**

### Property 22: Instructions maintain logical DOM order

*For any* rendered permission instructions, the DOM elements should appear in the same order as the visual reading order.

**Validates: Requirements 7.5**

## Error Handling

### Error Categories

1. **Permission Errors**
   - Permission denied by user
   - Permission previously denied (persistent denial)
   - Permission API not supported

2. **Geolocation Errors**
   - Position unavailable (GPS/network issues)
   - Timeout (request took too long)
   - Geolocation API not supported

3. **Validation Errors**
   - Invalid latitude value (out of range or non-numeric)
   - Invalid longitude value (out of range or non-numeric)

### Error Handling Strategy

**Permission Denied**:
- Check permission state before requesting
- If denied, show modal immediately
- Provide browser-specific re-enable instructions
- Offer manual entry alternative
- Log error for analytics

**Geolocation Timeout**:
- Show modal with timeout explanation
- Suggest retry with "Try Again" button
- Offer manual entry alternative
- Use 10-second timeout threshold

**Position Unavailable**:
- Show modal explaining GPS/network issues
- Suggest manual entry as primary alternative
- Provide link to external mapping services

**Unsupported Browser**:
- Detect lack of geolocation API
- Skip permission check
- Show modal with manual entry as only option
- Provide helpful message about browser limitations

**Validation Errors**:
- Display inline error messages below input fields
- Show specific range requirements (e.g., "Latitude must be between -90 and 90")
- Prevent form submission until valid
- Clear errors when user corrects input

### Error Recovery

All error states should provide at least one of:
1. Retry mechanism (for transient errors)
2. Alternative input method (manual coordinates)
3. External resource link (mapping services)

## Testing Strategy

### Unit Testing

Unit tests will focus on specific examples and edge cases:

**Browser Detection**:
- Test Chrome user agent detection
- Test Firefox user agent detection
- Test Safari user agent detection
- Test Edge user agent detection
- Test unknown/unsupported browser fallback

**Coordinate Validation**:
- Test valid latitude values (0, 45, -90, 90)
- Test invalid latitude values (-91, 91, 200, NaN)
- Test valid longitude values (0, 90, -180, 180)
- Test invalid longitude values (-181, 181, 360, NaN)
- Test boundary values (exactly -90, 90, -180, 180)

**Permission State Handling**:
- Test behavior when permission is granted
- Test behavior when permission is denied
- Test behavior when permission is prompt
- Test behavior when Permissions API is unavailable

**Error Handling**:
- Test PERMISSION_DENIED error code handling
- Test POSITION_UNAVAILABLE error code handling
- Test TIMEOUT error code handling
- Test unsupported geolocation API

**Modal Interactions**:
- Test modal opens on permission denial
- Test modal closes on Escape key
- Test modal closes on outside click
- Test manual entry button switches to coordinate inputs

### Property-Based Testing

Property tests will verify universal behaviors across all inputs using a property-based testing library (fast-check for TypeScript/React):

**Configuration**: Each property test should run a minimum of 100 iterations.

**Test Tagging**: Each test must include a comment referencing the design property:
```typescript
// Feature: geolocation-handling-improvement, Property 10: Latitude validation enforces valid range
```

**Properties to Test**:

1. **Coordinate Validation Properties** (Properties 10, 11)
   - Generate random numbers across full numeric range
   - Verify latitude validation accepts only [-90, 90]
   - Verify longitude validation accepts only [-180, 180]

2. **Form State Persistence** (Property 4)
   - Generate random form states with various field values
   - Open and close modal
   - Verify all form values remain unchanged

3. **Browser Detection** (Property 5)
   - Generate various user agent strings
   - Verify detector always returns valid BrowserType
   - Verify no crashes or undefined returns

4. **Error Logging** (Property 13)
   - Generate various error scenarios
   - Verify console.error is called for each
   - Verify error details are included

5. **No Alert Usage** (Property 14)
   - Generate various error scenarios
   - Verify window.alert is never called
   - Mock alert to track calls

6. **Modal Dismissal** (Property 17)
   - Generate various modal states
   - Simulate Escape key press
   - Verify modal closes in all cases

7. **Focus Management** (Properties 18, 19, 20)
   - Generate various modal open/close sequences
   - Verify focus moves to modal on open
   - Verify focus stays within modal when tabbing
   - Verify focus returns to button on close

8. **ARIA Attributes** (Property 21)
   - Render modal in various states
   - Verify required ARIA attributes are always present
   - Verify attribute values are valid

### Integration Testing

Integration tests will verify the complete flow:

1. **Happy Path**: Click button → permission granted → coordinates populated
2. **Permission Denial Path**: Click button → permission denied → modal shown → manual entry
3. **Retry Path**: Permission denied → enable in browser → retry → success
4. **Timeout Path**: Click button → timeout → modal shown → retry or manual entry

### Testing Tools

- **Unit Tests**: Vitest + React Testing Library
- **Property Tests**: fast-check library
- **Mocking**: vi.mock for geolocation API, permissions API, and console methods
- **Accessibility**: @testing-library/jest-dom for ARIA assertions

## Implementation Notes

### File Modifications Required

**Primary File**: `resources/js/pages/Vendor/Shop/Create.tsx`
- Add new state variables for modal, permission, browser type
- Replace `getCurrentLocation` function with enhanced version
- Add permission checking logic
- Add error handling functions
- Remove all `alert()` calls
- Add LocationPermissionModal component integration

**New Files to Create**:
1. `resources/js/pages/Vendor/Shop/components/LocationPermissionModal.tsx`
2. `resources/js/pages/Vendor/Shop/components/BrowserInstructionsContent.tsx`
3. `resources/js/utils/browserDetector.ts`

### Browser-Specific Instructions Content

**Chrome**:
1. Click the lock icon (🔒) in the address bar
2. Find "Location" in the permissions list
3. Change it from "Block" to "Allow"
4. Refresh the page and try again

**Firefox**:
1. Click the lock icon (🔒) in the address bar
2. Click "Clear This Permission"
3. Refresh the page
4. Click "Use My Current Location" again and allow when prompted

**Safari**:
1. Open Safari menu → Preferences
2. Go to Websites tab → Location Services
3. Find this website and change to "Allow"
4. Refresh the page and try again

**Edge**:
1. Click the lock icon (🔒) in the address bar
2. Click "Permissions for this site"
3. Find "Location" and change to "Allow"
4. Refresh the page and try again

**Unknown/Generic**:
1. Look for a location or permissions icon in your browser's address bar
2. Find location permissions and change to "Allow"
3. Refresh the page and try again
4. Or use the manual entry option below

### Accessibility Considerations

- Modal must have `role="dialog"` and `aria-modal="true"`
- Modal must have `aria-labelledby` pointing to modal title
- Focus trap must be implemented using a library like `focus-trap-react`
- All interactive elements must be keyboard accessible
- Instructions must be in logical reading order
- Color contrast must meet WCAG AA standards
- Loading states must be announced to screen readers

### Performance Considerations

- Permission state check is async but fast (< 100ms typically)
- Geolocation request timeout set to 10 seconds
- Modal rendering should be lazy-loaded if possible
- Browser detection runs once on component mount
- No unnecessary re-renders during permission flow

### Security Considerations

- Never store or transmit location data without user consent
- Log errors without exposing sensitive information
- Validate all coordinate inputs on both client and server
- Use HTTPS to enable geolocation API (browser requirement)
- Respect user's permission denial - don't repeatedly prompt
