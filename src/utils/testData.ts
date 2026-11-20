export interface Credentials {
  username: string;
  password: string;
}

/**
 * Static test data. The credentials below are the public demo account
 * published on https://the-internet.herokuapp.com/login, not a secret.
 */
export const users = {
  valid: { username: 'tomsmith', password: 'SuperSecretPassword!' },
  invalidUsername: { username: 'unknownUser', password: 'SuperSecretPassword!' },
  invalidPassword: { username: 'tomsmith', password: 'wrongPassword' },
  empty: { username: '', password: '' },
} as const satisfies Record<string, Credentials>;

export const messages = {
  login: {
    success: 'You logged into a secure area!',
    loggedOut: 'You logged out of the secure area!',
    invalidUsername: 'Your username is invalid!',
    invalidPassword: 'Your password is invalid!',
    loginRequired: 'You must login to view the secure area!',
  },
  forgotPassword: {
    sent: "Your e-mail's been sent!",
  },
  contextMenu: {
    alert: 'You selected a context menu',
  },
  javascriptAlerts: {
    alert: 'I am a JS Alert',
    confirm: 'I am a JS Confirm',
    prompt: 'I am a JS prompt',
    alertResult: 'You successfully clicked an alert',
    confirmOkResult: 'You clicked: Ok',
    confirmCancelResult: 'You clicked: Cancel',
    promptResult: (text: string) => `You entered: ${text}`,
    promptCancelledResult: 'You entered: null',
  },
  dynamicLoading: {
    finished: 'Hello World!',
  },
} as const;

export const homePage = {
  heading: 'Welcome to the-internet',
  subHeading: 'Available Examples',
  /** Examples covered by this suite; each must be listed on the home page. */
  coveredExamples: [
    'Add/Remove Elements',
    'Checkboxes',
    'Context Menu',
    'Dropdown',
    'Dynamic Content',
    'Dynamic Loading',
    'Forgot Password',
    'Form Authentication',
    'JavaScript Alerts',
  ],
} as const;

export const dropdownOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
] as const;
