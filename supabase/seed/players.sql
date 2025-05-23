-- This SQL only inserts player and admin rows with static UUIDs for testing, does not create Supabase auth.users!
insert into players (id, name, skill_level, points, created_at) values
('41b7f001-badf-4301-b0a1-000000000001', 'Alex Johnson', '3.6', 0, now()),
('41b7f001-badf-4301-b0a1-000000000002', 'Samantha Lee', '4.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000003', 'John Smith', '4.5', 0, now()),
('41b7f001-badf-4301-b0a1-000000000004', 'Maria Lopez', '5.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000005', 'Kevin Patel', '3.6', 0, now()),
('41b7f001-badf-4301-b0a1-000000000006', 'Emily Zhang', '4.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000007', 'Michael Brown', '4.5', 0, now()),
('41b7f001-badf-4301-b0a1-000000000008', 'Linda Garcia', '5.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000009', 'Chris Wilson', '3.6', 0, now()),
('41b7f001-badf-4301-b0a1-000000000010', 'Jessica Kim', '4.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000011', 'Daniel Young', '4.5', 0, now()),
('41b7f001-badf-4301-b0a1-000000000012', 'Rebecca Hall', '5.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000013', 'Eric Wright', '3.6', 0, now()),
('41b7f001-badf-4301-b0a1-000000000014', 'Natalie Clark', '4.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000015', 'Adam Turner', '4.5', 0, now()),
('41b7f001-badf-4301-b0a1-000000000016', 'Tina Martinez', '5.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000017', 'Henry Adams', '3.6', 0, now()),
('41b7f001-badf-4301-b0a1-000000000018', 'Sarah Perez', '4.0', 0, now()),
('41b7f001-badf-4301-b0a1-000000000019', 'George Baker', '4.5', 0, now()),
('41b7f001-badf-4301-b0a1-000000000020', 'Monica Evans', '5.0', 0, now());

-- Example admin row (replace UUID if you know your admin's UUID)
insert into players (id, name, skill_level, points, created_at)
values ('41b7f001-badf-4301-b0a1-00000000aaa1', 'Admin User', '5.0', 0, now());
