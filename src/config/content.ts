/**
 * All written content for the experience, kept in one place so the
 * "letter" reads as a single continuous piece and is easy to revise.
 * Multi-line beats are arrays of strings (rendered as separate lines).
 */

export const content = {
  loading: {
    title: ["Something small,", "for your 19th."],
    sub: "take your time.",
  },

  hero: {
    date: "11 • 08 • 2026",
    heading: "For your 19th.",
    sub: "You said you didn't really see what was so special about today.",
    line: "So I wanted to show you what I see.",
    scroll: "scroll slowly",
  },

  // Section 01
  nineteen: {
    heading: "19.",
    lead: "19 years of becoming the person you are today.",
    body:
      "And somewhere along those years, you became someone who means more to me than I could ever properly put into words.",
  },

  // Section 02
  farYouveCome: {
    heading: "Look how far you've come.",
    lines: [
      "This time last year, your world looked different.",
      "Since then, you've met new people, built friendships, created memories, grown, changed, laughed, cried, and experienced things you probably never expected.",
    ],
    pauseLine: "Look around you now.",
    afterPause: [
      "There are people who know you, love you, appreciate you and want to celebrate you.",
      "Maybe you don't see anything extraordinary about today.",
    ],
    statement: "But I do.",
  },

  // Section 03
  thisDay: {
    heading: "Maybe birthdays aren't special because the date says they are.",
    body:
      "Maybe they're special because they give us a reason to stop for a moment and realize how far we've travelled.",
    triplet: ["Another year.", "Another chapter.", "Another version of you."],
    prelude: "And whether you feel it right now or not...",
    statement: "you made it here.",
    close: "And that is worth celebrating.",
  },

  // Section 04 — the centerpiece
  sky: {
    remember: "Do you remember?",
    phrase: "The sky is beautiful.",
    intro: [
      "Just like I said before,",
      "the sky is our little secret...",
      "and this is why.",
    ],
    forever: "The sky will forever be beautiful.",
    times: ["Today.", "Tomorrow.", "And always."],
    everything: [
      "The moon.",
      "The stars.",
      "The clouds.",
      "The sun.",
      "Everything you can find up there.",
    ],
    changes: ["Everything changes.", "But somehow...", "The sky remains beautiful."],
    howISeeYou: "That's how I've always seen you.",
    firstMoment:
      "From the very first moment I met you, the way I saw you was different.",
    notPerfect: [
      "Not perfect.",
      "Not because life was perfect.",
      "Just... beautiful in your own way.",
    ],
    meaning: "That's what those words always meant.",
    phraseFinal: "The sky is beautiful.",
    nowYouKnow: "Now you know why.",
  },

  // Section 05
  yourYear: {
    heading: "This year belongs to you.",
    hopes: [
      "I hope it brings you more reasons to smile.",
      "I hope you meet beautiful people.",
      "I hope you build things you're proud of.",
      "I hope you discover parts of yourself you didn't know were there.",
      "I hope you laugh until your stomach hurts.",
      "I hope you have moments you wish you could pause forever.",
    ],
    close: "And I hope 19 is kind to you.",
    from: "18",
    to: "19",
  },

  // Section 06
  birthday: {
    heading: "Happy 19th Birthday.",
    sub: "Today is yours.",
    invite: "Let yourself be celebrated.",
    list: [
      "Eat something nice.",
      "Laugh with your people.",
      "Take too many pictures.",
      "Make memories.",
      "Enjoy yourself.",
    ],
    close: "You deserve a beautiful day.",
  },

  // Section 07 — the quiet, handwritten letter
  quiet: {
    heading: "Before you go...",
    lines: [
      "I don't know what this next year will look like for you.",
      "I don't know what memories you'll make, what people you'll meet, or where life will take you.",
      "But I hope when you look back at 19, you remember that there were people who genuinely wanted to see you happy.",
      "And I hope you were able to see just how loved you are.",
    ],
    turn: "Even if today doesn't feel special yet...",
    close: "I hope something happens that changes your mind.",
  },

  // Final section — the last sky
  finale: {
    prelude: "One last thing.",
    phrase: "The sky is beautiful.",
    name: "Happy birthday, Morenikeji.",
    line: "19 looks beautiful on you.",
    enjoy: "Enjoy your day. \u2764\ufe0f",
    footer: "the sky is beautiful.",
  },
} as const;

/** Chapters used by the desktop progress indicator (in scroll order). */
export const chapters = [
  { id: "hero", label: "For your 19th" },
  { id: "nineteen", label: "19" },
  { id: "far", label: "How far you've come" },
  { id: "this-day", label: "This day" },
  { id: "sky", label: "The sky" },
  { id: "your-year", label: "Your year" },
  { id: "birthday", label: "Happy birthday" },
  { id: "quiet", label: "A quiet message" },
  { id: "finale", label: "The last sky" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
