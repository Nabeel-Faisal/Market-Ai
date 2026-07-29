import React from 'react';
import { useParams } from 'react-router-dom';
import LocalServiceLandingTemplate from '@/components/LocalServiceLandingTemplate.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import { localServicePages } from '@/data/localServicePages.js';

const LocalServicePage = () => {
  // React Router cannot match partial dynamic segments (`/:service-in-:city`),
  // so the whole slug arrives as one param and is split here.
  const { localSlug } = useParams();

  const [serviceSlug, citySlug] = (localSlug || '').includes('-in-')
    ? localSlug.split('-in-')
    : [null, null];

  const pageData = localServicePages.find(
    (page) => page.serviceSlug === serviceSlug && page.citySlug === citySlug
  );

  if (!pageData) {
    return (
      <NotFoundPage
        heading="That page doesn't exist."
        message="This service and city combination isn't one we publish. Pick a service below and we'll show you where we work."
      />
    );
  }

  const relatedPages = localServicePages
    .filter((page) => page.citySlug === citySlug && page.serviceSlug !== serviceSlug)
    .slice(0, 8);

  return <LocalServiceLandingTemplate pageData={pageData} relatedPages={relatedPages} />;
};

export default LocalServicePage;
