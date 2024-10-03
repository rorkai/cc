import { supabase } from '@/utils/supabase';
import ComponentPreview from '@/components/ComponentPreview'
import { Header } from '../../components/Header';
import React from 'react';
import JotaiProvider from '@/components/JotaiProvider';
import ClientJotaiProvider from '@/components/ClientJotaiProvider';

async function getComponent(slug: string) {
  const { data, error } = await supabase
    .from('components')
    .select('*')
    .eq('component_slug', slug)
    .single();

  if (error) {
    console.error('Error fetching component:', error);
    return null;
  }
  return data;
}

export default async function ComponentPage({ params }: { params: { component_slug: string } }) {
  const component = await getComponent(params.component_slug);

  if (!component) {
    return <div>Component not found</div>;
  }

  return (
    <JotaiProvider>
      <ClientJotaiProvider initialValues={component}>
        <Header componentSlug={component.component_slug} isPublic={component.is_public} />
        <div className="w-full ">
          <ComponentPreview component={component} />
        </div>
      </ClientJotaiProvider>
    </JotaiProvider>
  );
}
