import { Router } from 'express';
import healthCheck from './health-check.js';
import integratedAiRouter from './integrated-ai.js';
import analyzerRouter from './analyzer.js';
import contactRouter from './contact.js';
import serviceInquiryRouter from './service-inquiry.js';
import localServiceInquiryRouter from './local-service-inquiry.js';
import newsletterRouter from './newsletter.js';
import sitemapRouter from './sitemap.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/sitemap.xml', sitemapRouter);
    router.use('/integrated-ai', integratedAiRouter);
    router.use('/analyzer', analyzerRouter);
    router.use('/contact', contactRouter);
    router.use('/service-inquiry', serviceInquiryRouter);
    router.use('/local-service-inquiry', localServiceInquiryRouter);
    router.use('/newsletter', newsletterRouter);

    return router;
};