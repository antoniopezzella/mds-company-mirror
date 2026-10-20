import React, { useState } from 'react';
import { Stepper, type StepConfig } from '../../components/ui/stepper';
import DSTextField from '../../components/TextField/TextField';
import Section from '../../components/Section/Section';
import { DashboardHeader } from '../../components/Header/Header';
import { Button as DSButton } from '../../components/ui/button';
import { DSSelect } from '../../components/ui/select';
import { DSSwitch } from '../../components/ui/switch';
import { Typography, Box, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ClinicalTrialsPage.scss';

export const ClinicalTrialsPage: React.FC = () => {
  const [sponsorType, setSponsorType] = useState('primary');
  const [usePrimaryAsAdditional, setUsePrimaryAsAdditional] = useState(false);
  const [formState, setFormState] = useState({
    companyName: 'HealthTech Innovations',
    country: 'United States of America',
    address1: '123, East Camelback Rd.Phoenix, AZ, 85202',
    address2: 'Suite 100',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85202',
    additionalCompanyName: 'Mountain View Wellness Clinic',
    additionalCountry: 'United States of America',
    additionalAddress1: 'P.O. Box 3, Mount Freedom',
    additionalAddress2: 'Suite 100',
    additionalCity: 'Mount Freedom',
    additionalState: 'New Jersey',
    additionalZip: '07970',
  });

  const stepperSteps: StepConfig[] = [
    { id: 'step-1', label: 'Sponsor', status: 'active' },
    { id: 'step-2', label: 'Contact', status: 'pending' },
    { id: 'step-3', label: 'Protocol', status: 'pending' },
    { id: 'step-4', label: 'Review', status: 'pending' },
  ];

  const handleInput = (key: string, value: string) => 
    setFormState(s => ({ ...s, [key]: value }));

  const handleSponsorTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: string | null,
  ) => {
    if (newType !== null) {
      setSponsorType(newType);
    }
  };

  return (
    <div className="clinical-trials-page mds-dashboard">
      <DashboardHeader sidebarOpen={false} onToggleSidebar={() => {}} />

      <div className="mds-container">
        <div className="stepper-wrapper mb-8 mt-6">
          <Stepper steps={stepperSteps} activeStep={0} orientation="horizontal" />
        </div>

        <Section>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ color: 'var(--role-fg-primary)', fontWeight: 700, mb: 1 }}>
              Sponsor Details
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--role-fg-neutral-subtle)', maxWidth: 800 }}>
              The Sponsor will appear as the primary insured on the policy unless you choose to enter a Local Sponsor below.
            </Typography>
          </Box>

          <div className="mds-row mb-10">
            <div className="mds-col-12">
              <ToggleButtonGroup
                value={sponsorType}
                exclusive
                onChange={handleSponsorTypeChange}
                aria-label="sponsor type"
                className="sponsor-toggle-group"
              >
                <ToggleButton value="primary" aria-label="primary sponsor">
                  Primary Sponsor
                </ToggleButton>
                <ToggleButton value="local" aria-label="local sponsor">
                  Local / Country Level Sponsor
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <Typography variant="h5" sx={{ color: 'var(--role-fg-primary)', fontWeight: 700, mb: 4 }}>
            Primary Sponsor Information
          </Typography>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Company Name"
                value={formState.companyName}
                onChange={(e) => handleInput('companyName', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <Typography variant="subtitle1" sx={{ color: 'var(--role-fg-primary)', fontWeight: 700, mt: 6, mb: 4 }}>
            Address
          </Typography>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSSelect
                label="Country"
                value={formState.country}
                onChange={(value) => handleInput('country', value as string)}
                options={[{ value: 'United States of America', label: 'United States of America' }]}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Address Line 1"
                value={formState.address1}
                onChange={(e) => handleInput('address1', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Address Line 2"
                value={formState.address2}
                onChange={(e) => handleInput('address2', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-6">
              <DSTextField
                label="City"
                value={formState.city}
                onChange={(e) => handleInput('city', e.target.value)}
                fullWidth
              />
            </div>
            <div className="mds-col-6">
              <DSSelect
                label="State/Province"
                value={formState.state}
                onChange={(value) => handleInput('state', value as string)}
                options={[{ value: 'AZ', label: 'AZ' }]}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-10">
            <div className="mds-col-6">
              <DSTextField
                label="ZIP/Postal Code"
                value={formState.zip}
                onChange={(e) => handleInput('zip', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <Divider sx={{ mb: 10, borderColor: 'var(--role-border-default)' }} />

          {/* Additional Insured Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h5" sx={{ color: 'var(--role-fg-primary)', fontWeight: 700 }}>
              Additional Insured 1
            </Typography>
            <Typography 
              variant="button" 
              sx={{ 
                color: 'var(--role-interactive-danger)', 
                cursor: 'pointer', 
                fontWeight: 700, 
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              Remove
            </Typography>
          </Box>

          <Box sx={{ mb: 6 }}>
            <DSSwitch
              label="Same as Primary Sponsor"
              checked={usePrimaryAsAdditional}
              onCheckedChange={setUsePrimaryAsAdditional}
            />
          </Box>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Company Name"
                value={formState.additionalCompanyName}
                onChange={(e) => handleInput('additionalCompanyName', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <Typography variant="subtitle1" sx={{ color: 'var(--role-fg-primary)', fontWeight: 700, mt: 6, mb: 4 }}>
            Address
          </Typography>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSSelect
                label="Country"
                value={formState.additionalCountry}
                onChange={(value) => handleInput('additionalCountry', value as string)}
                options={[{ value: 'United States of America', label: 'United States of America' }]}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Address Line 1"
                value={formState.additionalAddress1}
                onChange={(e) => handleInput('additionalAddress1', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-12">
              <DSTextField
                label="Address Line 2"
                value={formState.additionalAddress2}
                onChange={(e) => handleInput('additionalAddress2', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-6">
              <DSTextField
                label="City"
                value={formState.additionalCity}
                onChange={(e) => handleInput('additionalCity', e.target.value)}
                fullWidth
              />
            </div>
            <div className="mds-col-6">
              <DSSelect
                label="State/Province"
                value={formState.additionalState}
                onChange={(value) => handleInput('additionalState', value as string)}
                options={[{ value: 'New Jersey', label: 'New Jersey' }]}
                fullWidth
              />
            </div>
          </div>

          <div className="mds-row mb-6">
            <div className="mds-col-6">
              <DSTextField
                label="ZIP/Postal Code"
                value={formState.additionalZip}
                onChange={(e) => handleInput('additionalZip', e.target.value)}
                fullWidth
              />
            </div>
          </div>

          <Typography 
            variant="button" 
            sx={{ 
              color: 'var(--role-interactive-primary)', 
              cursor: 'pointer', 
              fontWeight: 700, 
              textTransform: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              mb: 10,
              fontSize: '16px'
            }}
          >
            + Add Additional Insured
          </Typography>

          <Divider sx={{ mb: 6, borderColor: 'var(--role-border-default)' }} />

          <div className="form-actions">
            <div className="mds-row justify-between items-center">
              <div 
                className="mds-col-auto flex items-center gap-2 cursor-pointer" 
                style={{ color: 'var(--role-fg-primary)' }}
              >
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                <Typography variant="button" sx={{ fontWeight: 700, textTransform: 'none', fontSize: '16px' }}>
                  Back
                </Typography>
              </div>
              <div className="mds-col-auto flex gap-4">
                <DSButton variant="outline" style={{ minWidth: 160, height: 48 }}>
                  Save and Exit
                </DSButton>
                <DSButton variant="primary" style={{ minWidth: 160, height: 48 }}>
                  Continue
                </DSButton>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};
export default ClinicalTrialsPage;
