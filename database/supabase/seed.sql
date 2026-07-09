-- Seed data for testing and development

-- Insert User (password is 'password123' hashed or plain for hackathon dev)
INSERT INTO users (id, name, email, password)
VALUES ('d3b07384-d113-495f-929a-24157d6b46ef', 'Aditi Sharma', 'aditi@sakhi.ai', 'password123')
ON CONFLICT (email) DO NOTHING;

-- Insert Health Profile (AI Health Twin digital profile)
INSERT INTO health_profile (user_id, age, weight, height, blood_group, allergies, conditions, pregnancy, menopause, goals)
VALUES ('d3b07384-d113-495f-929a-24157d6b46ef', 26, 58.5, 163.0, 'O+', 'Gluten sensitive', 'Mild PCOS symptoms', FALSE, FALSE, 'Regulate period, track nutrition, improve energy')
ON CONFLICT (user_id) DO NOTHING;

-- Insert Cycle Logs (Last cycle details)
INSERT INTO cycle_logs (user_id, date, flow, pain, mood, symptoms)
VALUES 
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-06-15', 'Heavy', 'Severe', 'Irritable', 'Bloating, Backache'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-06-16', 'Medium', 'Moderate', 'Tired', 'Cramps'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-06-17', 'Medium', 'Mild', 'Calm', 'None'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-06-18', 'Light', 'None', 'Happy', 'None'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-06-19', 'Spotting', 'None', 'Energetic', 'None');

-- Insert Mood Logs for last few days
INSERT INTO mood_logs (user_id, date, mood, stress_level, notes)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-07', 'Calm', 3, 'Busy day at work but handled it well. Meditated for 10 minutes.'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-08', 'Energetic', 2, 'Great workout session in the morning. Feel very productive!'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-09', 'Tired', 6, 'A bit overwhelmed. Sleep was poor. Had sweet cravings.');

-- Insert Water Logs
INSERT INTO water_logs (user_id, date, liters)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-07', 2.2),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-08', 2.5),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-09', 1.8);

-- Insert Sleep Logs
INSERT INTO sleep_logs (user_id, date, hours, quality)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-07', 7.5, 'Good'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-08', 8.0, 'Excellent'),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-09', 6.2, 'Fair');

-- Insert Exercise Logs
INSERT INTO exercise_logs (user_id, date, steps, calories)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-07', 8200, 320),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-08', 10400, 410),
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-09', 5100, 180);

-- Insert Medicines
INSERT INTO medicines (user_id, medicine_name, dosage, scheduled_time, taken, date)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', 'Folic Acid', '400 mcg', '09:00:00', TRUE, '2026-07-09'),
('d3b07384-d113-495f-929a-24157d6b46ef', 'Omega 3 Fish Oil', '1000 mg', '13:00:00', TRUE, '2026-07-09'),
('d3b07384-d113-495f-929a-24157d6b46ef', 'Iron Supplement', '17 mg', '21:00:00', FALSE, '2026-07-09');

-- Insert Nutrition Log
INSERT INTO nutrition_logs (user_id, date, meal_image, protein, iron, calories, fiber, suggestions)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', '2026-07-09', 'https://example.com/meal.jpg', 42.5, 8.4, 1650, 22.0, 'Add spinach or pumpkin seeds to dinner to meet your daily iron targets.');

-- Insert Chat History
INSERT INTO chat_history (user_id, role, message, timestamp)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', 'user', 'Why do I feel so tired right before my period?', '2026-07-09 20:15:00'),
('d3b07384-d113-495f-929a-24157d6b46ef', 'model', 'Feeling tired before your period is very common and is primarily driven by hormonal fluctuations. Estrogen and progesterone drop sharply, which can reduce energy and affect serotonin (the mood-regulating chemical). Try eating iron-rich foods, staying hydrated, and doing light yoga to boost circulation.', '2026-07-09 20:15:20');

-- Insert Notifications
INSERT INTO notifications (user_id, title, message, seen)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', 'Hydration Goal Alert', 'You are 400ml away from your hydration target today. Grab a glass of water!', FALSE),
('d3b07384-d113-495f-929a-24157d6b46ef', 'Cycle Predictor', 'Based on your logs, your next period is expected in 4 days. Keep tracking!', FALSE);

-- Insert Appointments
INSERT INTO appointments (user_id, doctor, date, notes)
VALUES
('d3b07384-d113-495f-929a-24157d6b46ef', 'Dr. Meera Sen (Gynecologist)', '2026-07-15 11:30:00', 'Routine checkup and discussion regarding cycle regularity.');
