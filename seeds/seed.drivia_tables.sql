BEGIN;

TRUNCATE
  drivia_leaderboard,
  drivia_questions,
  drivia_users
  RESTART IDENTITY CASCADE;

INSERT INTO drivia_users (user_name, password)
VALUES
  ('jordan', 'Amandaplease!1'),
  ('b.deboop', 'Amandaplease!1'),
  ('c.bloggs', 'Amandaplease!1'),
  ('s.smith', 'Amandaplease!1'),
  ('lexlor', 'Amandaplease!1'),
  ('wippy', 'Amandaplease!1');

INSERT INTO drivia_questions (question, answer, points, category)
VALUES
  ('What are the dying words of Charles Foster Kane in Citizen Kane?', 'rosebud', 200, 'movies'),
('What was the first feature-length animated movie ever released?', 'snowwhite', 200, 'movies'),
('In The Matrix, does Neo take the blue pill or the red pill?', 'red', 200, 'movies'),
('What American writer/director starred in several iconic European-produced “Spaghetti Westerns”?', 'clinteastwood', 400, 'movies'),
('Who played Juror Number 8 in 12 Angry Men?', 'henryfonda', 400, 'movies'),
('The head of what kind of animal is front-and-center in an infamous scene from The Godfather?', 'horse', 400, 'movies'),
('For what movie did Tom Hanks score his first Academy Award nomination?', 'big', 800, 'movies'),
('What 1927 musical was the first “talkie”?', 'thejazzsinger', 800, 'movies'),
('What’s the name of the skyscraper in Die Hard?', 'nakatomiplaza', 800, 'movies'),
('In which year was John F. Kennedy assassinated?', '1963', 200, 'history'),
('Which bridge was the first to be built across the River Thames in London?', 'londonbridge', 200, 'history'),
('Which dung beetle was worshipped by the ancient Egyptians?', 'scarab', 200, 'history'),
('Greenland was a colony of which country until 1981?', 'denmark', 400, 'history'),
('In 1927, who became the first man to fly solo and non-stop across the Atlantic?', 'charleslindbergh', 400, 'history'),
('In which country did the Easter Rising take place in 1916?', 'ireland', 400, 'history'),
('One of the ancient world wonders, the “Hanging Gardens,” was found in which city?', 'babylon', 800, 'history'),
('Who was shot outside the Hilton Hotel in Washington on March 30th, 1981?', 'ronaldreagan', 800, 'history'),
('Which Greek historian is known as the “Father of History”?', 'herodotus', 800, 'history'),
('In the United States, where can alligators and crocodiles be found together in the wild?', 'florida', 200, 'science'),
('What is another name for fossilized resin?', 'amber', 200, 'science'),
('How many plates comprise the surface of the Earth?', 'seven', 200, 'science'),
('What kind of animal is a sea monkey?', 'shrimp', 400, 'science'),
('To which part of physics does the Archimedes Principle refer?', 'buoyancy', 400, 'science'),
('What Australian marsupial is often mistaken for a monkey?', 'cuscus', 400, 'science'),
('What unit is resistance measured in?', 'ohm', 800, 'science'),
('What "trapdoor" on your windpipe helps keep out food particles?', 'epiglottis', 800, 'science'),
('What is the first phase of mitosis?', 'interphase', 800, 'science'),
('What is the capital of California?', 'sacramento', 200, 'state-capitals'),
('What is the capital of Colorado?', 'denver', 200, 'state-capitals'),
('What is the capital of New York?', 'albany', 200, 'state-capitals'),
('What is the capital of Alabama?', 'montgomery', 400, 'state-capitals'),
('What is the capital of Illinois?', 'springfield', 400, 'state-capitals'),
('What is the capital of Louisiana?', 'batonrouge', 400, 'state-capitals'),
('What is the capital of Michigan?', 'lansing', 800, 'state-capitals'),
('What is the capital of New Jersey?', 'trenton', 800, 'state-capitals'),
('What is the capital of North Dakota?', 'bismarck', 800, 'state-capitals'),
('The large usually colorful triangular sail used while running with the wind is called the what?', 'spinnaker', 200, 'sailing'),
('Apart from a harbour, port means what?', 'left', 200, 'sailing'),
('What is the main body of a boat called?', 'hull', 200, 'sailing'),
('On 15 May 2010, who became the youngest person to complete a solo and unassisted around the world sailing trip?', 'jessicawatson', 400, 'sailing'),
('What is the name of the holes that are cut to let water run off the deck?', 'scuppers', 400, 'sailing'),
('Which basic maneuver will a beating boat or ship need to execute, usually many times?', 'tacking', 400, 'sailing'),
('Sailing is an Olympic sport. What year was it first included on the Olympic program?', '1896', 800, 'sailing'),
('You are sailing a two masted boat with the mizzen mast located forward of the steering post. What type of boat are you on?', 'ketch', 800, 'sailing'),
('What colour flag must be flown when first entering the territorial waters of another Country?', 'yellow', 800, 'sailing'),
('Which is the main substance used to make a crayon?', 'wax', 200, 'art'),
('Which art movement is Salvador Dali associated with?', 'surrealism', 200, 'art'),
('What is the material which provides a surface upon which an artist applies color, collage, etc.?', 'support', 200, 'art'),
('After giving up mural painting, Gustav Klimt designed for what industry?', 'fashion', 400, 'art'),
('In her later years, Georgia O''Keeffe loved painting the deserts and cliffs of what state?', 'newmexico', 400, 'art'),
('Rembrandt opened his first art studio at which age?', 'nineteen', 400, 'art'),
('What is Pablo Picasso''s daughter''s name?', 'paloma', 800, 'art'),
('Who painted "The Kiss"?', 'gustavklimt', 800, 'art'),
('What is the Japanese art of flower arrangement called?', 'ikebana', 800, 'art'),
('Hall of Fame NBA player Larry Bird also won NBA Coach of the Year while coaching which team?', 'pacers', 200, 'sports'),
('What are the color of football goal posts?', 'yellow', 200, 'sports'),
('The area behind the line of scrimmage is known as what?', 'backfield', 200, 'sports'),
('Which 20th century NBA player scored 100 points in a single game?', 'wiltchamberlain', 400, 'sports'),
('In the game of cricket which bird name means scoring no runs?', 'duck', 400, 'sports'),
('Who is the only athlete ever to play in a Super Bowl and a World Series?', 'deionsanders', 400, 'sports'),
('Who was the first player in history to win the NBA''s Most Improved Player Award in 1986?', 'alvinrobertson', 800, 'sports'),
('Which NFL player later went on to become a US Supreme Court Judge?', 'byronwhite', 800, 'sports'),
('Which player from the 1998 NFL Draft is considered by many to be the biggest draft bust ever?', 'ryanleaf', 800, 'sports');

INSERT INTO drivia_leaderboard (
  user_id,
  score
) VALUES
  (1, 600),
  (2, 500),
  (3, 400),
  (4, 300),
  (5, 200);

COMMIT;
