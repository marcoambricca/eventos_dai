/*Events*/

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event2', 'Description for event 2', 2, 3, '2024-12-13', 90, 2000, '1', 1500, 10);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event3', 'Description for event 3', 1, 4, '2024-12-14', 60, 1500, '1', 500, 11);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event4', 'Description for event 4', 3, 3, '2024-12-15', 150, 1200, '1', 800, 12);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event5', 'Description for event 5', 2, 2, '2024-12-16', 180, 2500, '1', 2000, 13);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event6', 'Description for event 6', 1, 3, '2024-12-17', 75, 800, '1', 300, 14);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event7', 'Description for event 7', 2, 4, '2024-12-18', 120, 1800, '1', 1200, 15);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event8', 'Description for event 8', 3, 3, '2024-12-19', 90, 2200, '1', 950, 16);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event9', 'Description for event 9', 2, 2, '2024-12-20', 100, 1300, '1', 1300, 17);

INSERT INTO public.events(
	name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
	VALUES ('event10', 'Description for event 10', 1, 3, '2024-12-21', 150, 1700, '1', 600, 18);

/*Enrollments*/

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (69, 10, 'enrolled', '2014-10-23', '1', 'nice', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (70, 11, 'registered', '2015-01-10', '0', 'looking forward', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (71, 12, 'signed up', '2016-03-15', '1', 'great experience', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (72, 13, 'attended', '2017-05-20', '1', 'very informative', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (73, 14, 'participated', '2018-07-25', '0', 'didn’t attend', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (74, 15, 'joined', '2019-09-30', '1', 'amazing event', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (75, 16, 'enrolled', '2020-11-01', '1', 'very useful', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (76, 17, 'registered', '2021-12-05', '0', 'couldn’t make it', 2);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (77, 18, 'signed up', '2022-01-10', '1', 'fantastic', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (69, 19, 'attended', '2022-02-14', '1', 'very engaging', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (70, 20, 'participated', '2022-03-18', '0', 'will join next time', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (71, 21, 'joined', '2022-04-22', '1', 'enjoyed it', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (72, 22, 'enrolled', '2022-05-26', '1', 'learned a lot', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (73, 23, 'registered', '2022-06-30', '0', 'not available', 2);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (74, 24, 'signed up', '2022-07-15', '1', 'inspiring', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (75, 25, 'attended', '2022-08-10', '1', 'great networking', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (76, 26, 'participated', '2022-09-14', '0', 'missed it', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (77, 27, 'joined', '2022-10-20', '1', 'excellent session', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (69, 28, 'enrolled', '2022-11-22', '1', 'informative', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (70, 29, 'registered', '2022-12-30', '0', 'can’t attend', 2);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (71, 30, 'signed up', '2023-01-10', '1', 'very productive', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (72, 31, 'attended', '2023-02-12', '1', 'helpful', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (73, 32, 'participated', '2023-03-15', '0', 'next time', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (74, 33, 'joined', '2023-04-20', '1', 'great discussions', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (75, 34, 'enrolled', '2023-05-25', '1', 'very engaging', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (76, 35, 'registered', '2023-06-30', '0', 'couldn’t attend', 2);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (77, 36, 'signed up', '2023-07-15', '1', 'excellent opportunity', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (69, 37, 'attended', '2023-08-20', '1', 'really enjoyed', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (70, 38, 'participated', '2023-09-25', '0', 'missed it', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (71, 39, 'joined', '2023-10-30', '1', 'great learning', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (72, 40, 'enrolled', '2023-11-05', '1', 'highly recommend', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (73, 41, 'registered', '2023-12-10', '0', 'can’t attend', 2);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (74, 42, 'signed up', '2024-01-15', '1', 'wonderful session', 5);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (75, 43, 'attended', '2024-02-20', '1', 'very insightful', 4);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (76, 44, 'participated', '2024-03-25', '0', 'will attend next time', 3);

INSERT INTO public.event_enrollments(
	id_event, id_user, description, registration_date_time, attended, observations, rating)
	VALUES (77, 45, 'joined', '2024-04-30', '1', 'excellent event', 5);
