import { Box, Container, Typography, Card, CardContent, Divider } from '@mui/material';
import { getRoleColor } from '../theme/roles';
import '../global.scss';

export default function GridTestPage() {
  return (
    <Box sx={{ py: 6, backgroundColor: getRoleColor('surface.default') }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <Typography variant="overline" sx={{ color: getRoleColor('text.secondary'), letterSpacing: 2 }}>
            Sandbox
          </Typography>
          <Typography variant="h3" sx={{ color: getRoleColor('text.primary') }}>
            Grid Test Page
          </Typography>
          <Typography variant="body1" sx={{ color: getRoleColor('text.secondary'), maxWidth: 720 }}>
            A lightweight page for experimenting with the design system grid, using the same container/typography
            structure as the showcase but stripped down for quick iteration.
          </Typography>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, color: getRoleColor('text.primary') }}>
            Responsive 12-Column Row
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: getRoleColor('text.secondary') }}>
            Combines `.row`, `.col-*`, offsets, and gap utilities to validate spacing tokens across breakpoints.
          </Typography>
          <div className="row gap-4 align-start">
            <section className="col-12 col-md-7">
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="overline" sx={{ color: getRoleColor('text.secondary') }}>
                    Main Content
                  </Typography>
                  <Typography variant="h6">Grid-powered hero</Typography>
                  <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                    Use this region to test long-form copy, CTA buttons, or imagery nested within a column.
                  </Typography>
                </CardContent>
              </Card>
            </section>

            <aside className="col-12 col-md-4 offset-md-1">
              <Card sx={{ height: '100%', background: getRoleColor('surface.subtle') }}>
                <CardContent>
                  <Typography variant="overline" sx={{ color: getRoleColor('text.secondary') }}>
                    Sidebar
                  </Typography>
                  <Typography variant="body2">
                    Swap content here to validate sticky panels or promo cards without touching the main showcase.
                  </Typography>
                </CardContent>
              </Card>
            </aside>
          </div>
        </Box>

        <Divider sx={{ borderColor: getRoleColor('border.muted'), mb: 6 }} />

        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 2, color: getRoleColor('text.primary') }}>
            Auto-Fit Cards
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: getRoleColor('text.secondary') }}>
            `.grid-auto-fit-md` keeps cards responsive without media queries; combine with `.gap-6` for token spacing.
          </Typography>
          <div className="grid-auto-fit-md gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={`auto-card-${index}`}>
                <CardContent>
                  <Typography variant="subtitle2">Card {index + 1}</Typography>
                  <Typography variant="body2" sx={{ color: getRoleColor('text.secondary') }}>
                    Drop any component here to validate wrapping behavior.
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>

        <Divider sx={{ borderColor: getRoleColor('border.muted'), mb: 6 }} />

        <Box>
          <Typography variant="h5" sx={{ mb: 2, color: getRoleColor('text.primary') }}>
            Dashboard Matrix
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: getRoleColor('text.secondary') }}>
            Mix `.grid-cols-4`, `.row-span-*`, and `.grid-flow-dense` for masonry-style arrangements.
          </Typography>
          <div className="grid-cols-4 gap-3 grid-flow-dense">
            <Card className="col-span-2 row-span-2" sx={{ background: getRoleColor('interactive.primary') }}>
              <CardContent
                sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
              >
                Spotlight 2×2
              </CardContent>
            </Card>
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={`dense-card-${index}`} sx={{ background: getRoleColor('surface.accent') }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">Tile {index + 1}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
}
