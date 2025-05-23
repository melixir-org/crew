'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        skills: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-gradient p-0.5 rounded-lg">
            <form
                onSubmit={handleSubmit}
                className="bg-melixir-darker rounded-[calc(0.5rem-1px)] p-6 md:p-8 space-y-4"
            >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-melixir-light">
                            Name
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Your Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="border-white/10 bg-white/5 focus:border-melixir-purple"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-melixir-light">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="border-white/10 bg-white/5 focus:border-melixir-purple"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="role-select"
                            className="text-melixir-light"
                        >
                            Role
                        </Label>
                        <Select
                            required
                            onValueChange={handleRoleChange}
                            name="combobox"
                        >
                            <SelectTrigger
                                id="role-select"
                                className="border-white/10 bg-white/5 focus:border-melixir-purple"
                            >
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="founder">Founder</SelectItem>
                                <SelectItem value="contributor">
                                    Contributor
                                </SelectItem>
                                <SelectItem value="investor">
                                    Investor
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skills" className="text-melixir-light">
                            Skills or Idea (brief)
                        </Label>
                        <Input
                            id="skills"
                            name="skills"
                            placeholder="Describe your skills or idea briefly"
                            required
                            value={formData.skills}
                            onChange={handleChange}
                            className="border-white/10 bg-white/5 focus:border-melixir-purple"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient hover:opacity-90 mt-4"
                        disabled={isSubmitting || isSubmitted}
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : isSubmitted
                            ? 'Applied Successfully!'
                            : 'Apply Now'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
