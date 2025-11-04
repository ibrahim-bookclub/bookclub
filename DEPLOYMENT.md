# Deployment Checklist

## Pre-Deployment Checklist

- [ ] All files are present:
  - [ ] `index.html`
  - [ ] `styles.css`
  - [ ] `script.js`
  - [ ] `favicon.svg`
  - [ ] `manifest.json`
  - [ ] `.nojekyll`
  - [ ] `README.md`

- [ ] Test locally:
  - [ ] Open `index.html` in browser
  - [ ] Check all sections load correctly
  - [ ] Verify RTL layout
  - [ ] Check responsive design on mobile
  - [ ] Verify Typeform embed works

## GitHub Pages Deployment Steps

1. **Create/Update Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repository-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in left sidebar
   - Under "Source":
     - Select branch: `main`
     - Select folder: `/ (root)`
   - Click "Save"

3. **Wait for Deployment**
   - Check Actions tab for build status
   - Wait 2-5 minutes
   - Your site will be available at:
     `https://username.github.io/repository-name/`

4. **Verify Deployment**
   - [ ] Site loads correctly
   - [ ] Favicon appears in browser tab
   - [ ] All images and fonts load
   - [ ] Typeform embed works
   - [ ] Mobile responsive design works

## Custom Domain (Optional)

See `CUSTOM_DOMAIN.md` for detailed instructions.

Quick setup:
1. Add `CNAME` file with your domain (e.g., `yourdomain.com`)
2. Configure DNS:
   - A records for root domain: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - CNAME for www: `username.github.io`
3. Update GitHub Pages settings:
   - Add custom domain in Settings > Pages
   - Enable "Enforce HTTPS"

## Troubleshooting

- **Site not loading**: Check Actions tab for errors
- **404 errors**: Ensure `.nojekyll` file exists
- **Favicon not showing**: Clear browser cache
- **RTL not working**: Verify `dir="rtl"` in `<html>` tag
- **Fonts not loading**: Check internet connection

## Post-Deployment

- [ ] Share the URL
- [ ] Test on different devices
- [ ] Update social media links if needed
- [ ] Set up analytics (optional)
