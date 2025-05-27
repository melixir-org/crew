'use client';

import type React from 'react';

import { useRef, useState } from 'react';
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
import { applyApi } from '@/lib/client-only-api';

export function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        skills: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const successMessageRef = useRef<HTMLDivElement>(null);

    function scrollToSuccessMessage() {
        setTimeout(() => {
            if (successMessageRef.current) {
                successMessageRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 100);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }));
    };

    const getSkillsFieldConfig = () => {
        switch (formData.role) {
            case 'founder':
                return {
                    label: 'Your Idea',
                    placeholder: 'Describe your idea briefly',
                };
            case 'contributor':
                return {
                    label: 'Your Skills',
                    placeholder: 'Describe your skills briefly',
                };
            case 'investor':
            case 'other':
                return {
                    label: 'Introduction',
                    placeholder: 'Tell us about yourself briefly',
                };
            default:
                return {
                    label: 'Skills, Idea, or Introduction',
                    placeholder:
                        'Describe your skills, idea, or introduce yourself briefly',
                };
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setIsFailed(false);
            setIsSubmitted(false);
            setIsAnalyzing(false);

            await applyApi({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                skills: formData.skills,
            });

            if (formData.role === 'contributor') {
                setIsAnalyzing(true);
                setTimeout(() => {
                    setIsSubmitted(true);
                    scrollToSuccessMessage();
                }, 3000);
            } else {
                setIsSubmitted(true);
                scrollToSuccessMessage();
            }
        } catch (error) {
            setIsFailed(true);
        } finally {
            setIsSubmitting(false);
        }
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
                            name="role"
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

                    {formData.role && (
                        <div className="space-y-2">
                            <Label
                                htmlFor="skills"
                                className="text-melixir-light"
                            >
                                {getSkillsFieldConfig().label}
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                placeholder={getSkillsFieldConfig().placeholder}
                                required
                                value={formData.skills}
                                onChange={handleChange}
                                className="border-white/10 bg-white/5 focus:border-melixir-purple"
                            />
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient hover:opacity-90 mt-4"
                        disabled={isSubmitting || isSubmitted || isAnalyzing}
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : isSubmitted
                            ? 'Applied Successfully!'
                            : isAnalyzing
                            ? 'Analyzing...'
                            : isFailed
                            ? 'Failed to apply, please retry!'
                            : 'Apply Now'}
                    </Button>
                </div>
            </form>
            {isSubmitted && (
                <div
                    ref={successMessageRef}
                    className="mt-1 p-4 bg-melixir-darker rounded-lg text-center"
                >
                    {isAnalyzing ? (
                        <>
                            <p className="text-green-400">
                                Welcome to the contributor community!
                            </p>
                            <a
                                href="https://chat.whatsapp.com/GjC5OGTvkMk3169Gkc9qjq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Join WhatsApp Group
                            </a>
                        </>
                    ) : (
                        <p className="text-green-400">
                            We will get back to you soon on your email!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
