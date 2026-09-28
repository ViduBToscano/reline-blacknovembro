DROP POLICY IF EXISTS "Anyone can log an event" ON public.page_events;
CREATE POLICY "Anyone can log an event"
  ON public.page_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (event = ANY (ARRAY['form_view'::text, 'form_submit_click'::text, 'popup_view'::text, 'community_click'::text, 'offer_click'::text]));