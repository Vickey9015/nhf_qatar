-- NHF Arabia admin tables
-- In phpMyAdmin, select u533425593_nhf_db and import this file.
-- Importing again replaces blogs and site details, and clears messages and the admin password.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

DROP TABLE IF EXISTS rate_limits;
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(80) NOT NULL,
  title VARCHAR(160) NOT NULL,
  published_on DATE NOT NULL,
  image VARCHAR(255) NOT NULL,
  excerpt VARCHAR(400) NOT NULL,
  paragraphs MEDIUMTEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE enquiries (
  id CHAR(16) NOT NULL,
  created_at DATETIME NOT NULL,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(160) NOT NULL DEFAULT '',
  property_label VARCHAR(80) NOT NULL DEFAULT '',
  service_label VARCHAR(80) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  PRIMARY KEY (id),
  KEY created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE settings (
  setting_key VARCHAR(40) NOT NULL,
  setting_value VARCHAR(255) NOT NULL,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE rate_limits (
  ip_hash CHAR(64) NOT NULL,
  last_at INT UNSIGNED NOT NULL,
  PRIMARY KEY (ip_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO posts (slug, title, published_on, image, excerpt, paragraphs, position) VALUES
(
  'how-often-to-book',
  'How often should a visit be booked?',
  '2026-10-12',
  '/images/hero-business-treat.jpg',
  'A house with one new sighting is a different job from a kitchen that serves every night.',
  '["A single call-out is enough for many homes. Something has shown up, we find where it is living, treat that, and come back once to see if it has stopped.","A restaurant, hotel, or shared building is different. Food, waste, and deliveries keep arriving, so pests keep testing the same doors. Those sites do better on a standing gap: monthly, or whatever the building actually needs after the first inspection.","Cleaning every day does not close a drain, a gap behind a fridge, or a bin store that stays wet. The schedule is there to catch the next attempt early, not because the last treatment failed.","If you are unsure which you need, say what you have seen and what the building is. We will tell you whether one visit is the right start."]',
  0
),
(
  'treatment-and-children',
  'What to plan when children are in the house',
  '2026-09-28',
  '/images/solution-home.jpg',
  'Most rooms do not need to be emptied for the whole day. You should still know which ones to keep clear.',
  '["The first question we ask is who sleeps and eats in the rooms we are treating. Children, and anyone who crawls on the floor, change how we set the visit up.","Before we start you will hear which rooms to stay out of, what to put away, and when those rooms can be used again. Food, bottles, and pet bowls come off the surfaces we will work on.","For a light cockroach or ant job, the household can often stay home and simply avoid the kitchen for a stated time. A heavy bed-bug job is different: that bedroom should be empty while we work, and bedding is dealt with first.","If you are pregnant, or a child has a breathing condition, say so when you book. We will plan the rooms around that."]',
  1
),
(
  'disinfecting-home-or-office',
  'Disinfecting a home or an office',
  '2026-09-04',
  '/images/solution-disinfect.jpg',
  'A surface treatment is for the rooms you can leave empty for a short time. It is not a substitute for cleaning.',
  '["Disinfection is a separate booking from pest treatment. It is for surfaces in a home, office, clinic, or hotel room that need a reset after illness, a deep clean, or a pest job.","We treat the surfaces we can reach: handles, desks, switches, and the fittings in the rooms on the list. A fine spray gets into gaps that a cloth misses. It does not replace wiping grease off a kitchen line.","You will be told which rooms to leave, and for how long, before anyone goes back in. Electronics, open food, and papers should be covered or moved.","Book it on its own, or add it to a pest visit when the same rooms need both."]',
  2
),
(
  'what-cockroaches-leave-behind',
  'What a cockroach problem leaves behind',
  '2026-08-18',
  '/images/pest-cockroach.jpg',
  'You may not see an insect in daylight. The cupboard often shows the problem first.',
  '["Cockroaches rest in dark gaps and come out to feed. By the time one crosses the floor at night, there are usually more in the void behind the appliances.","Look for dark specks in a drawer, smear marks along a kickboard, and a musty smell when a cupboard has been shut. Egg cases and shed skins mean they have been there long enough to breed.","Wiping the worktop removes what you can see. It does not reach the harbourage. That is the part the visit is for.","Empty the cupboard under the sink before we arrive if you can. The job is faster, and we can see the pipes."]',
  3
),
(
  'spotting-bed-bugs-early',
  'Spotting bed bugs before they spread',
  '2026-08-02',
  '/images/pest-bedbug.jpg',
  'The sooner a guest room or bedroom is checked, the fewer pieces of furniture are involved.',
  '["Bed bugs stay near the sleeper. Early on, that means one bed. Left alone, they move to the next bed, the sofa, and the luggage rack.","Check the piping of the mattress and the joints of the headboard. Dark spots, shed skins, and specks on the sheet are the usual signs. Bites alone are not proof.","Do not move the mattress into another room to “air it”. That is how a second room gets involved. Bag the linen and tell us which room it came from.","In a hotel, take the room out of service and book the visit for after checkout. We will say whether the rooms on either side need a look as well."]',
  4
),
(
  'kitchens-on-a-schedule',
  'Why a kitchen does better on a schedule',
  '2026-07-15',
  '/images/industry-food.jpg',
  'A busy pass produces scraps, warmth, and a bin that is never empty for long.',
  '["One treatment can knock a kitchen problem back. It cannot change the fact that food and waste return the next day. Drains, the hot line, and the delivery door stay attractive.","A standing visit catches droppings, a new trail, or a failed door seal between services, while it is still small. The gap depends on the site. A small café is not a hotel production kitchen.","We book the round after closing and leave a note of what was found. The morning team should be able to open without a surprise.","If you only want a call-out because something showed up this week, that is still the right first step. The schedule is the conversation after we have seen the kitchen."]',
  5
);

INSERT INTO settings (setting_key, setting_value) VALUES
('phoneDisplay', '+974 7769 9786'),
('email', 'Info@nhfarabia.com'),
('salesEmail', 'Sales@nhfarabia.com'),
('location', 'Doha, Qatar'),
('crNumber', 'CR NO. 253779'),
('topNote', '24/7 Pest Control Across Doha Qatar'),
('hours', '24/7 across Doha');
