import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { RegistrationFormData } from '@/interfaces';
import type { Participant } from '@/interfaces';

const RegistrationForm: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showNotes, setShowNotes] = useState(false);

  // Learning path options
  const learningPaths = [
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'devops', label: 'DevOps' },
    { id: 'uiux', label: 'UI/UX' }
  ];

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      age: 0,
      birthdate: '',
      gender: 'Male',
      learningPath: [],
      addNotes: false,
      notes: ''
    },
    onSubmit: async ({ value }) => {
      try {
        // Log form submission
        console.log('Form submitted with data:', value);
        toast.success('Registration submitted successfully!');

        // Create new participant
        const newParticipant: Participant = {
          ...value,
          gender: value.gender as 'Male' | 'Female',
          id: Date.now().toString(),
          registeredAt: new Date().toISOString()
        };

        // Add to participants list
        setParticipants(prev => [...prev, newParticipant]);

        // Reset form
        form.reset();
        setShowNotes(false);

      } catch (error) {
        console.error('Submission error:', error);
        toast.error('Failed to submit registration');
      }
    }
  });

  // Handle learning path checkbox changes
  const handleLearningPathChange = (pathId: string, checked: boolean) => {
    form.setFieldValue('learningPath', (prev) => {
      if (checked) {
        return [...prev, pathId];
      } else {
        return prev.filter(id => id !== pathId);
      }
    });
  };

  // Handle add notes checkbox
  const handleAddNotesChange = (checked: boolean) => {
    setShowNotes(checked);
    form.setFieldValue('addNotes', checked);
    if (!checked) {
      form.setFieldValue('notes', '');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Registration Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bootcamp Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Full Name */}
            <form.Field
              name="fullName"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Full name is required' : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Full Name *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={() => {
                      field.handleBlur();
                      console.log('Full Name field blurred');
                    }}
                    onFocus={() => {
                      console.log('Full Name field focused');
                    }}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Email & Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required';
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return 'Invalid email format';
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={() => {
                        field.handleBlur();
                        console.log('Email field blurred');
                      }}
                      onFocus={() => {
                        console.log('Email field focused');
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Password is required';
                    if (value.length < 6) return 'Password must be at least 6 characters';
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Password *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={() => {
                        field.handleBlur();
                        console.log('Password field blurred');
                      }}
                      onFocus={() => {
                        console.log('Password field focused');
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter password"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Age & Birthdate Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <form.Field
                name="age"
                validators={{
                  onChange: ({ value }) => {
                    if (!value || value < 1) return 'Age is required';
                    if (value < 17 || value > 65) return 'Age must be between 17-65';
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Age *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value || ''}
                      onBlur={() => {
                        field.handleBlur();
                        console.log('Age field blurred');
                      }}
                      onFocus={() => {
                        console.log('Age field focused');
                      }}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      placeholder="Enter your age"
                      min="17"
                      max="65"
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Birthdate */}
              <form.Field
                name="birthdate"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Birthdate is required' : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Birthdate *</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      onBlur={() => {
                        field.handleBlur();
                        console.log('Birthdate field blurred');
                      }}
                      onFocus={() => {
                        console.log('Birthdate field focused');
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Gender */}
            <form.Field name="gender">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Gender *</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value as 'Male' | 'Female');
                      console.log('Gender selected:', value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Learning Path */}
            <form.Field
              name="learningPath"
              validators={{
                onChange: ({ value }) =>
                  value.length === 0 ? 'Please select at least one learning path' : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label>Learning Path *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {learningPaths.map((path) => (
                      <div key={path.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={path.id}
                          checked={field.state.value.includes(path.id)}
                          onChange={(e) => {
                            const checked = (e.target as HTMLInputElement).checked;
                            const newValue = checked ? [...field.state.value, path.id] : field.state.value.filter((v) => v !== path.id);
                            field.handleChange(newValue);
                          }}
                        />
                        <Label 
                          htmlFor={path.id} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {path.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">{field.state.meta.errors}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Add Notes Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="addNotes"
                checked={showNotes}
                onChange={e => handleAddNotesChange((e.target as HTMLInputElement).checked)}
                />
              <Label htmlFor="addNotes" className="text-sm font-normal cursor-pointer">
                Add Notes?
              </Label>
            </div>

            {/* Conditional Notes Field */}
            {showNotes && (
              <form.Field name="notes">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Notes</Label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ''}
                      onBlur={() => {
                        field.handleBlur();
                        console.log('Notes field blurred');
                      }}
                      onFocus={() => {
                        console.log('Notes field focused');
                      }}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Add any additional notes here..."
                      rows={4}
                    />
                  </div>
                )}
              </form.Field>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full md:w-auto px-8"
              disabled={!form.state.canSubmit}
            >
              Register for Bootcamp
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Participants List */}
      {participants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Registered Participants ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {participants.map((participant, index) => (
                <Card key={participant.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{participant.fullName}</h3>
                        <p className="text-sm text-gray-600">{participant.email}</p>
                        <p className="text-sm">Age: {participant.age}</p>
                        <p className="text-sm">Gender: {participant.gender}</p>
                        <p className="text-sm">Birthdate: {participant.birthdate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Learning Paths:</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {participant.learningPath.map(path => (
                            <li key={path} className="capitalize">{path}</li>
                          ))}
                        </ul>
                        {participant.notes && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Notes:</p>
                            <p className="text-sm text-gray-600">{participant.notes}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Registered: {new Date(participant.registeredAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* JSON View Toggle */}
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                        View JSON Data
                      </summary>
                      <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(participant, null, 2)}
                      </pre>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegistrationForm;