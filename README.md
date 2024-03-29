# CB-Map (MDM Work Sample)

A directory of useful tools for cross-border e-commerce specialists in Taiwan. I have deployed a clone of the original project [over here](https://mdm-cb-map.vercel.app/). The application is written with TypeScript. It is built on [Next.js 13](https://nextjs.org/docs) and uses [Sanity.io](https://www.sanity.io/) to manage the site's contents. I've recorded 2 short videos to demo the website:

- [CB-Map Site Demo](https://www.loom.com/share/0ae20fb9929040ad9836f28041fd9a6d?sid=d87de563-0945-450e-a932-326fd887f66f)
- [CB-Map CMS Demo](https://www.loom.com/share/622f4ab031034e32ac84a0f5a5287157?sid=ab6f9b4f-3b4d-4480-8a1e-1c2d571f2c32)

## Orienting the code

The app follows the [Next.js 13 App Router folder structure](https://nextjs.org/docs/getting-started/project-structure). I have started documenting the code from the `app/(site)/(home)/page.tsx` file.

Although much of the CMS UI rendering is handled by the NextStudio component (as seen in `app/studio/[[...index]]/page.tsx`), the custom configurations can be found in the `sanity.config.ts` file. Other notable CMS-related files include:

- `schemas/index.ts`
- `plugins/settings.tsx`

## Running locally

### Without Docker

1. If you wish to run the application locally, make sure you have Node (v19+) and Yarn installed.
2. Copy the ENV variables from `Dockerfile` to a new `.env.local` file.
3. Then run `yarn install && yarn dev`.
4. Open [http://localhost:3000](http://localhost:3000) to see the result.

### Docker

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

When you're done, run:

```bash
docker-compose down
```

## Accessing the CMS

1. You may access the CMS either locally or via the deployed version.
   - If you run the app locally, open up [http://localhost:3000/studio](http://localhost:3000/studio) to see it.
   - Alternatively, [the deployed CMS can be accessed here](https://mdm-cb-map.vercel.app/studio).
2. After opening the CMS studio, select Google as the login provider.
   - Email: mdm2024sean@gmail.com
   - Password: masters2024
3. Please watch the [CMS demo](https://www.loom.com/share/622f4ab031034e32ac84a0f5a5287157?sid=ab6f9b4f-3b4d-4480-8a1e-1c2d571f2c32) to see more of how the CMS plays in tandem with the website.
