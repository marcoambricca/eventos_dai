SELECT 
	events.id, events.name, events.description, 
	events.id_event_category, 
	event_categories.name category,
	events.id_event_location, events.start_date, events.duration_in_minutes,  
	events.price, events.enabled_for_enrollment, events.max_assistance, events.id_creator_user,
	json_build_object(
		'id', event_categories.id,
		'name',  event_categories.name, 
		'display_order',  event_categories.display_order
	) as category
FROM events
INNER JOIN event_categories ON events.id_event_category =event_categories.id
INNER JOIN event_tags ON events.id = event_tags.id_event
INNER JOIN tags on tags.id = event_tags.id_tag
WHERE Lower(events.name) like Lower('%tay%')  OR Lower(event_categories.name) like Lower('%mu') OR events.start_date = $3 OR (tags.name like Lower('%Rock%') and (event_tags.id_event = 1))